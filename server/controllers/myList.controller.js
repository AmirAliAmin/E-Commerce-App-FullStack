import MyListModel from "../models/myList.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//create category
var imageArr = [];
export async function addMyListController(req, res) {
  try {
    imageArr = [];
    const userId = req.userId;
    const {
      productId,
      productTitle,
      image,
      rating,
      price,
      brand,
      oldPrice,
      discount,
    } = req.body;

    const item = await MyListModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (item) {
      return res.status(400).json({
        message: "Item already in your list",
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
    const myList = new MyListModel({
      productId,
      productTitle,
      image: imageArr,
      rating,
      price,
      brand,
      oldPrice,
      discount,
      userId,
    });

    const save = await myList.save();

    res.status(200).json({
      error: false,
      success: true,
      message: "The Product added in the my List",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteToMyListController(req, res) {
  try {
    const myListItem = await MyListModel.findById(req.params.id);
    if (!myListItem) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "The item with this given id was not found",
      });
    }

    const deleteItem = await MyListModel.findByIdAndDelete(req.params.id);
    if (!deleteItem) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "The item is not deleted",
      });
    }

    res.status(200).json({
      error: false,
      success: true,
      message: "The Product is deleted successfully ",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getMyListController(req, res) {
  try {
    const userId = req.userId;

    const myListItem = await MyListModel.find({
        userId:userId
    })

    res.status(200).json({
      error: false,
      success: true,
      data:myListItem
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
