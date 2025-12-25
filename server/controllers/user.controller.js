import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function registerUserController(req, res) {
  try {
    let user;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email , name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email: email });
    if (user) {
      return res.json({
        message: "User Already Register",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const payload = {
      name,
      email,
      password: hashPassword,
      otp: verifyCode,
      otp_expiry: Date.now() + 60000,
    };
    user = new UserModel(payload);
    await user.save();

    // const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
    // const resp = sendEmailFun(email,"Verify Email", "", "Your OTP is" + verifyCode)

    await sendEmailFun({
      sendTo: email,
      subject: "Verify email by E-commerce App",
      text: "Verify email from Ecomerce App",
      html: verifyEmailTemplate({
        name,
        url: verifyCode,
      }),
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );
    return res.status(200).json({
      message: "user REgister successfully! please verify your email.",
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        error: true,
        success: false,
      });
    }

    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otp_expiry > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otp_expiry = null;
      await user.save();
      return res.status(200).json({
        message: "Email verified successfully",
        success: true,
      });
    } else if (!isCodeValid) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    } else {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User Not register",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }
    if (user.verify_email !== true) {
      return res.status(400).json({
        message: "your email is not verify",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check Your Password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.json({
      message: "Login successfully",
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(req, res) {
  try {
    const userid = req.userId;

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refreshToken", cookieOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    return res.json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//image upload
var imageArr = [];
export async function userAvatarController(req, res) {
  try {
    imageArr = [];
    const userId = req.userId;
    // const image = req.file;

    const user = await UserModel.findOne({ _id: userId });

    //first remove image from cloudinary
    const imgUrl = user.avatar;
    const urlArr = imgUrl.split("/");

    const avatar_image = urlArr[urlArr.length - 1];

    const imageName = avatar_image.split(".")[0];
    if (imageName) {
      const response = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {
          // console.log(error,result)
        }
      );
    }

    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        error: true,
        success: false,
      });
    }
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };
    for (let i = 0; i < req?.files?.length; i++) {
      const img = await cloudinary.uploader.upload(
        req.files[i].path,
        options,
        function (error, result) {
          console.log(result);
          imageArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${req.files[i].filename}`);
          console.log(req.files[i].filename);
        }
      );
    }

    user.avatar = imageArr[0];
    await user.save();
    return res.json({
      _id: userId,
      avatar: imageArr[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(req, res) {
  const imgUrl = req.query.img;
  const urlArr = imgUrl.split("/");

  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];
  if (imageName) {
    const response = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {
        // console.log(error,result)
      }
    );
    if (response) {
      res.status(200).send(response);
    }
  }
}

//update user details
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) return res.status(400).send("The user cannot be Updated!");

    let verifyCode = "";
    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
        verify_email:  true,
        password: hashPassword,
        otp: verifyCode !== "" ? verifyCode : null,
        otp_expiry: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );

    if (email !== userExist.email) {
      await sendEmailFun({
        sendTo: email,
        subject: "Verify email from Ecomerce App ",
        text: "",
        html: verifyEmailTemplate({
          name,
          url: verifyCode,
        }),
      });
    }

    return res.json({
      message: "User updated successfully",
      error: false,
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = verifyCode;
    user.otp_expiry = Date.now() + 600000;
    user.verify_email = false;

    await user.save();

    await sendEmailFun({
      sendTo: email,
      subject: "Verify email from Ecomerce App ",
      text: "",
      html: verifyEmailTemplate(user.name, verifyCode),
    });

    return res.json({
      message: "check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required field email otp.",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();
    if (user.otp_expiry < currentTime) {
      return res.status(400).json({
        message: "otp is expired",
        error: true,
        success: false,
      });
    }
    user.otp = "";
    user.otp_expiry = "";
    user.verify_email = true;

    await user.save();

    return res.json({
      message: "verify otp successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function restPassword(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required field email, password and confirmPassword",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Both passwords are not matched, they must be same",
        error: true,
        success: false,
      });
    }

    if (user.verify_email !== true) {
      return res.status(400).json({
        message: "verify the email by OTP",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password unpdated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updatePassword(req, res) {
  try {
    const { email, oldPassword, password, confirmPassword } = req.body;

    if (!email || !oldPassword || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Provide email, oldPassword, password and confirmPassword",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcryptjs.compare(oldPassword, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Your oldPassword is wrong",
        error: true,
        success: false,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Both passwords are not matched, they must be same",
        error: true,
        success: false,
      });
    }

    if (user.verify_email !== true) {
      return res.status(400).json({
        message: "verify the email by OTP",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password unpdated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Provide token",
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?.id;
    const newAccessToken = await generateAccessToken(userId);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", cookieOption);
    return res.json({
      message: "New access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetails(req, res) {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );

    return res.json({
      message: "user details",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllUser(req, res) {
  try {
    const users = await UserModel.find()
    if (!users) {
      res.status(400).json({
        message: "User are not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: users,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}