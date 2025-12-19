import React, { useContext, useEffect, useState } from "react";
import { IoMdCloudUpload, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../../utils/apiPath";
import { putData, uploadImage } from "../../utils/api";
import { AdminContext } from "../../context/AdminContext";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import AddAddress from "./AddAddress";

function AdminProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [addressPanel, setAddressPanel] = useState(false)
  const [formField, setFormField] = useState({
    name: "",
    number: "",
  });
  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const {
    userData,
    setUserData,
    alertBox,
  } = useContext(AdminContext);
  const history = useNavigate();

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }

    return initials.toUpperCase();
  };

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      alertBox("Please select JPG, JPEG, PNG or WEBP image", "error");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await uploadImage(API_PATH.AUTH.USER_AVATAR, formData);

      if (res) {
        setUserData((prev) => ({
          ...prev,
          avatar: res.avatar,
        }));

        alertBox("Profile picture updated", "success");
      } else {
        alertBox("Upload failed", "error");
      }
    } catch (err) {
      console.log(err);
      alertBox("Something went wrong", "error");
    } finally {
      setUploading(false);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  const onChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const valideValue = Object.values(formField).every(
      (el) => el.trim() !== ""
    );
    if (!valideValue) {
      alertBox("All fields from My Profile are required", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await putData(
        API_PATH.AUTH.UPDATE_USER_DETAIL(userData?._id),
        {
          name: formField.name,
          mobile: formField.number,
        }
      );

      if (res?.success) {
        setUserData((prev) => ({
          ...prev,
          name: formField.name,
          mobile: formField.number,
        }));

        alertBox("Profile updated successfully", "success");
      }
    } catch (error) {
      alertBox("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitPass = async (e) => {
    e.preventDefault();

    const valideValue = Object.values(changePassword).every(
      (el) => el.trim() !== ""
    );
    if (!valideValue) {
      alertBox("All fields from Change Password are required", "error");
      return;
    }
    if (
      changePassword.newPassword.trim() !==
      changePassword.confirmPassword.trim()
    ) {
      alertBox("Password and Confirm Password must be same", "error");
      return;
    }

    if (!userData.email) {
      alertBox("User email not found.", "error");
      return;
    }

    setIsLoading2(true);

    try {
      const res = await putData(API_PATH.AUTH.UPDATE_PASSWORD, {
        email: userData.email,
        password: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword,
        oldPassword: changePassword.oldPassword,
      });

      if (!res?.error) {
        alertBox(res.message, "success");
        setIsLoading2(false);
      } else {
        alertBox(res.message, "error");
      }
    } catch (error) {
      alertBox("Something went wrong", "error");
    } finally {
      setIsLoading2(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history("/");
    }
  }, []);
  useEffect(() => {
    if (userData) {
      setFormField({
        name: userData?.name ?? "",
        number: userData?.mobile ? String(userData.mobile) : "",
      });
      setChangePassword({
        email: userData.email,
      });
    }
  }, [userData]);
  return (
    <div className="my-4 shadow-md sm:rounded-lg bg-white">
      <h1 className="py-5 px-3 font-bold text-[20px]">Admin Profile</h1>
      <div className="relative overflow-x-auto mt-5 no-scroll"></div>
      <div>
        <div className="w-full p-3 flex items-center gap-2">
          <div className="w-25 h-25 bg-purple-500 rounded-full text-xl font-bold text-white flex items-center justify-center relative group overflow-hidden">
            {uploading === true ? (
              <div className=" animate-spin w-10 h-10 border-3 border-white border-solid rounded-full border-t-transparent"></div>
            ) : userData?.avatar ? (
              <img
                src={userData.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(userData?.name || "")
            )}
            <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[#0000006f] overflow-hidden rounded-full opacity-0 group-hover:opacity-100 cursor-pointer items-center justify-center flex ">
              <IoMdCloudUpload />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer overflow-hidden"
                accept="image/*"
                onChange={(e) => onChangeFile(e, API_PATH.AUTH.USER_AVATAR)}
              />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-[20px]">{userData?.name}</h1>
            <h6 className="text-gray-600 text-xs">{userData?.email}</h6>
          </div>
        </div>
        <div className="w-[70%]">
          <div className="card bg-white p-5 shadow-lg rounded-md mb-3">
            <div className="flex items-center justify-between pb-3">
              <h2 className="">MY Profile</h2>
              <p
                className="text-primary cursor-pointer"
                onClick={() => setShowChangePass(!showChangePass)}
              >
                Change Password
              </p>
            </div>
            <hr className="text-gray-300" />

            <form className="py-5" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5 flex-wrap">
                <div className="w-full flex items-center gap-5">
                  <div className="w-[50%]">
                    <label htmlFor="fullName">
                      <input
                        type="text"
                        name="name"
                        value={formField.name}
                        disabled={isLoading === true ? true : false}
                        onChange={onChangeInput}
                        placeholder={"Full Name"}
                        className="border border-gray-500 outline-0 py-2 px-2 w-full"
                      />
                    </label>
                  </div>
                  <div className="w-[50%]">
                    <PhoneInput
                      defaultCountry="pk"
                      value={formField.number}
                      disabled={isLoading}
                      onChange={(value) =>
                        setFormField((prev) => ({
                          ...prev,
                          number: value || "",
                        }))
                      }
                      className="border border-gray-500 outline-0 py-2 px-2 w-full"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="email">
                    <input
                      type="email"
                      placeholder={userData?.email || "Your Email"}
                      disabled
                      className="border border-gray-500 text-gray-500 outline-0 py-2 px-2 w-full"
                    />
                  </label>
                </div>
              </div>
              <br />
              
              <div className="flex items-center gap-5">
                <button
                  type="submit"
                  className="py-2 px-5 cursor-pointer bg-primary text-white w-25"
                >
                  {isLoading === true ? (
                    <div className=" animate-spin w-5 h-5 border-3 border-primary border-solid rounded-full border-t-transparent"></div>
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  type="button"
                  className="py-2 px-5 border border-primary text-primary cursor-pointer w-25"
                  onClick={() =>
                    setFormField({
                      name: userData.name || "",
                      number: userData.mobile || "",
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center p-5 border border-dashed border-gray-500 bg-[#f1faff] hover:bg-[#eee9e9] my-3 cursor-pointer" onClick={()=>setAddressPanel(!addressPanel)}>
                <span className="text-[14px] font-medium">Add Address</span>
              </div>
              {
                addressPanel && (
                  
                    <div className="absolute bg-[#00000080] w-full h-full z-100 inset-0 border py-10 text-white flex items-center justify-center" onClick={()=>setAddressPanel(false)}>
                    <AddAddress setAddressPanel={setAddressPanel}/>
                    </div>
                 
                )
              }
          </div>
          {showChangePass && (
            <div className="card bg-white p-5 shadow-lg rounded-md">
              <h2 className="pb-3">Change Password</h2>
              <hr className="text-gray-300" />

              <form className="py-5" onSubmit={handleSubmitPass}>
                <div className="flex items-center gap-5 flex-wrap">
                  <div className="w-full flex items-center flex-wrap gap-5">
                    <div className="w-[92%] relative">
                      <label htmlFor="oldPassword">
                        <input
                          type={showPass ? "text" : "password"}
                          name="oldPassword"
                          value={changePassword.oldPassword}
                          disabled={isLoading2 === true ? true : false}
                          onChange={onChangePasswordInput}
                          placeholder={"Old Password"}
                          className="border border-gray-500 outline-0 py-2 px-2 w-full"
                        />
                      </label>
                      <div
                        className="absolute right-2 top-4 cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <IoMdEye /> : <IoMdEyeOff />}
                      </div>
                    </div>
                    <div className="w-[45%] relative">
                      <label htmlFor="newPassword">
                        <input
                          type={showPass2 ? "text" : "password"}
                          name="newPassword"
                          value={changePassword.newPassword}
                          disabled={isLoading2 === true ? true : false}
                          onChange={onChangePasswordInput}
                          placeholder={"New Password"}
                          className="border border-gray-500 outline-0 py-2 px-2 w-full"
                        />
                      </label>
                      <div
                        className="absolute right-2 top-4 cursor-pointer"
                        onClick={() => setShowPass2(!showPass2)}
                      >
                        {showPass2 ? <IoMdEye /> : <IoMdEyeOff />}
                      </div>
                    </div>
                    <div className="w-[45%] relative">
                      <label htmlFor="confirmPassword">
                        <input
                          type={showPass3 ? "text" : "password"}
                          name="confirmPassword"
                          value={changePassword.confirmPassword}
                          disabled={isLoading2 === true ? true : false}
                          onChange={onChangePasswordInput}
                          placeholder={"Confirm Password"}
                          className="border border-gray-500 outline-0 py-2 px-2 w-full"
                        />
                      </label>
                      <div
                        className="absolute right-2 top-4 cursor-pointer"
                        onClick={() => setShowPass3(!showPass3)}
                      >
                        {showPass3 ? <IoMdEye /> : <IoMdEyeOff />}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="flex items-center gap-5">
                  <button
                    type="submit"
                    className="py-2 px-5 cursor-pointer bg-primary text-white w-25"
                  >
                    {isLoading === true ? (
                      <div className=" animate-spin w-5 h-5 border-3 border-primary border-solid rounded-full border-t-transparent"></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 border border-primary text-primary cursor-pointer w-25"
                    onClick={() =>
                      setChangePassword({
                        oldPassword: "",
                        newPassword: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
