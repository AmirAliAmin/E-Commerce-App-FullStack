import HomeBannerModel from "../models/homeBanner.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imageArr = [];

export async function createHomeBanner(req, res) {
  try {
    const {
      images,
    } = req.body;

    let banner = new HomeBannerModel({
      images,
    });
    if (!banner) {
      res.status(400).json({
        message: "Home Banner is not Uploaded",
        error: true,
        success: false,
      });
    }
    banner = await banner.save();
    imageArr = [];
    return res.json({
      data: banner,
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
export async function uploadHomeBanner(req, res) {
  try {
    const imageArr = [];

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, options);
      imageArr.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    return res.status(200).json({
      success: true,
      images: imageArr,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeHomeBannerFromCloudinary(req, res) {
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

export async function deleteHomeBanner(req, res) {
  try {
    const bannerId = req.params.id;
    const banner= await HomeBannerModel.findById(bannerId)

    if (!banner || banner.length === 0) {
      return res.status(404).json({
        message: "No products Size found",
        success: false,
        error: true,
      });
    }

    const deleteBanner = await HomeBannerModel.findByIdAndDelete(bannerId);
    if (!deleteBanner) {
      return res.status(404).json({
        message: "Home Banner not deleted",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "Home Banner Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllHomeBanners(req, res) {
  try {
    const banner = await HomeBannerModel.find()
    if (!banner) {
      res.status(400).json({
        message: "Home Banner are not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
