import CategoryModel from "../models/category.model.js";

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
export async function createCategory(req, res) {
  try {
    imageArr = [];

    const { name, parentCatName, parentCatId } = req.body;
    // const image = req.file;

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

    let category = new CategoryModel({
      name,
      images: imageArr,
      parentCatId,
      parentCatName,
    });

    if (!category) {
      res.status(400).json({
        message: "Category not created",
        error: true,
        success: false,
      });
    }

    category = await category.save();
    imageArr = [];
    return res.json({
      category: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all category
export async function getCategories(req, res) {
  try {
    const categories = await CategoryModel.find();
    const categoryMap = {};

    categories.forEach(cat => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });

    const rootCategories = [];

    categories.forEach(cat => {
      if (cat.parentCatId) {
        categoryMap[cat.parentCatId]?.children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return res.status(200).json({
      error: false,
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategoryCount(req, res) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentCatId: undefined,
    });
    if (!categoryCount) {
      res.status(400).json({ success: false, error: true });
    } else {
      res.send({
        categoryCount: categoryCount,
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

export async function getSubCategoryCount(req, res) {
  try {
    const categories = await CategoryModel.find();
    if (!categories) {
      res.status(400).json({ success: false, error: true });
    } else {
      const subCatList = [];
      for (let cat of categories) {
        if (cat.parentCatId !== undefined) {
          subCatList.push(cat);
        }
      }
      res.send({
        subCategoryCount: subCatList.length,
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

export async function getCategory(req, res) {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      res.status(400).json({
        message: "Category with the given Id is not found",
        success: false,
        error: true,
      });
    }
    return res.send({
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// export async function removeImageFromCloudinary(req, res) {
//   const imgUrl = req.query.img;
//   const urlArr = imgUrl.split("/");

//   const image = urlArr[urlArr.length - 1];

//   const imageName = image.split(".")[0];
//   if (imageName) {
//     const response = await cloudinary.uploader.destroy(
//       imageName,
//       (error, result) => {
//         // console.log(error,result)
//       }
//     );
//     if (response) {
//       res.status(200).send(response);
//     }
//   }
// }

export async function deleteCategory(req, res) {
  try {
    const category = await CategoryModel.findById(req.params.id);
    const images = category.images;

    for (const img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");

      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {
          // console.log(error,result)
        });
      }
    }

    const subCategory = await CategoryModel.find({
      parentCatId: req.params.id,
    });
    for (let i = 0; i < subCategory.length; i++) {
      const thirdsubCategory = await CategoryModel.find({
        parentCatId: subCategory[i]._id,
      });

      for (let i = 0; i < thirdsubCategory.length; i++) {
        const delteThirdSubcat = await CategoryModel.findByIdAndDelete(
          thirdsubCategory[i]._id
        );
      }
      const deleteSubcat = await CategoryModel.findByIdAndDelete(
        subCategory[i]._id
      );
    }
    const deleteCat = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deleteCat) {
      res.status(400).json({
        message: "Category not found",
        success: false,
        error: true,
      });
    }
    res.status(200).json({
      success: true,
      error: false,
      message: "Category Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateCategory(req, res) {
  try {
    const { name, images, parentCatName, parentCatId } = req.body;

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
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        images:imageArr,
        parentCatId,
        parentCatName,
      },
      { new: true }
    );
    if (!category) {
      res.status(400).json({
        message: "Category cannot be updated",
        success: false,
        error: true,
      });
    }
    imageArr=[]
    res.status(200).json({
      success: true,
      error: false,
      message: "Category Updated",
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