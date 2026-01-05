import { error } from "console";
import ProductModel from "../models/product.model.js";
import ProductRAMSModel from "../models/productRAMS.model.js";
import ProductSizeModel from "../models/productSize.model.js";

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
export async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      brand,
      price,
      oldprice,
      catName,
      catId,
      subcatName,
      subcatId,
      thirdsubcat,
      thirdsubcatId,
      images,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
    } = req.body;

    let product = new ProductModel({
      name,
      description,
      images,
      brand,
      price,
      oldprice,
      catName,
      catId,
      subcatName,
      subcatId,
      thirdsubcat,
      thirdsubcatId,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
    });
    if (!product) {
      res.status(400).json({
        message: "product is not created",
        error: true,
        success: false,
      });
    }
    product = await product.save();
    imageArr = [];
    return res.json({
      data: product,
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
export async function uploadProductImages(req, res) {
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

//get all products
export async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(400).json({
        message: "Page is not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      res.status(400).json({
        message: "products are not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get product by id
export async function getProductById(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const product = await ProductModel.findById(req.params.id)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!product) {
      res.status(400).json({
        message: "Category with the given Id is not found",
        success: false,
        error: true,
      });
    }
    return res.send({
      error: false,
      success: true,
      product: product,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get product by category id
export async function getProductByCatId(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const product = await ProductModel.find({ catId: req.params.id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!product) {
      res.status(400).json({
        message: "Category with the given Id is not found",
        success: false,
        error: true,
      });
    }
    return res.send({
      error: false,
      success: true,
      data: product,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get product by category name
export async function getProductByCatName(req, res) {
  try {
    const { catName } = req.query;

    if (!catName) {
      return res.status(400).json({
        message: "Category name is required",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({ catName }).populate("category");

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for this category",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get product by sub category id
export async function getProductBySubCatId(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const product = await ProductModel.find({ subcatId: req.params.id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!product) {
      res.status(400).json({
        message: "Category with the given Id is not found",
        success: false,
        error: true,
      });
    }
    return res.send({
      error: false,
      success: true,
      data: product,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get sub cat by sub Category name
export async function getProductBySubCatName(req, res) {
  try {
    const { subcatName } = req.query;

    if (!subcatName) {
      return res.status(400).json({
        message: "Category name is required",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({ subcatName }).populate(
      "category"
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for this category",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get product by third sub category id
export async function getProductByThirdSubCatId(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const product = await ProductModel.find({ thirdsubcat: req.params.id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!product) {
      res.status(400).json({
        message: "Category with the given Id is not found",
        success: false,
        error: true,
      });
    }
    return res.send({
      error: false,
      success: true,
      product: product,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get sub cat by third sub Category name
export async function getProductByThirdSubCatName(req, res) {
  try {
    const { thirdsubcat } = req.query;

    if (!thirdsubcat) {
      return res.status(400).json({
        message: "Category name is required",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({ thirdsubcat }).populate(
      "category"
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for this category",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get products by price
export async function getProductByPrice(req, res) {
  try {
    let productList = [];

    if (req.query.catId !== "" && req.query.catId !== undefined) {
      const productListArr = await ProductModel.find({
        catId: req.query.catId,
      }).populate("category");
      productList = productListArr;
    }

    if (req.query.subcatId !== "" && req.query.subcatId !== undefined) {
      const productListArr = await ProductModel.find({
        subcatId: req.query.subcatId,
      }).populate("category");
      productList = productListArr;
    }

    if (
      req.query.thirdsubcatId !== "" &&
      req.query.thirdsubcatId !== undefined
    ) {
      const productListArr = await ProductModel.find({
        thirdsubcatId: req.query.thirdsubcatId,
      }).populate("category");
      productList = productListArr;
    }

    const filterProduct = productList.filter((product) => {
      if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
        return false;
      }
      if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
        return false;
      }
      return true;
    });

    return res.status(200).json({
      error: false,
      success: true,
      data: filterProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get product by rating
export async function getProductByRating(req, res) {
  try {
    const { rating, catId, subcatId, thirdsubcatId } = req.query;

    let products = [];

    if (catId !== undefined) {
      products = await ProductModel.find({ rating, catId }).populate(
        "category"
      );
    }
    if (subcatId !== undefined) {
      products = await ProductModel.find({ rating, subcatId }).populate(
        "category"
      );
    }

    if (thirdsubcatId !== undefined) {
      products = await ProductModel.find({ rating, thirdsubcat }).populate(
        "category"
      );
    }

    console.log(rating);
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No rating for this product",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all product count

export async function getProductsToatalCount(req, res) {
  try {
    const productCount = await ProductModel.countDocuments();

    if (!productCount) {
      return res.status(404).json({
        message: "",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: productCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all featured products
export async function getProductThatisFeatured(req, res) {
  try {
    const { isFeatured } = req.query;

    const products = await ProductModel.find({ isFeatured: true }).populate(
      "category"
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found that is featured",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//delete product by id
export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const products = await ProductModel.findById(productId).populate(
      "category"
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found",
        success: false,
        error: true,
      });
    }

    const images = products.images;

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

    const deleteProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({
        message: "products not deleted",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "Product Deleted successfully",
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

//update the product by using id
export async function updateProductbyId(req, res) {
  try {
    const {
      name,
      description,
      brand,
      images = [],
      price,
      oldprice,
      catName,
      catId,
      subcatName,
      subcatId,
      thirdsubcat,
      thirdsubcatId,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
    } = req.body;

    // Start with existing images from frontend
    const imageArr = [...images];

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    // Upload new files if any
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, options);
        imageArr.push(result.secure_url);
        fs.unlinkSync(file.path); // safely remove uploaded file
      }
    }
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        images: imageArr,
        brand,
        price,
        oldprice,
        catName,
        catId,
        subcatName,
        subcatId,
        thirdsubcat,
        thirdsubcatId,
        category,
        countInStock,
        rating,
        isFeatured,
        discount,
        productRam,
        size,
        productWeight,
      },
      { new: true }
    );
    if (!product) {
      res.status(400).json({
        message: "product cannot be updated",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      message: "product Updated",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function addProductRAMS(req, res) {
  try {
    let productRAMS = new ProductRAMSModel({
      name:req.body.name
    })

    productRAMS = await productRAMS.save();
    if (!productRAMS) {
      res.status(400).json({
      message: "Product RAMS is not added",
      error: true,
      success: false,
    });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "product RAMS Added",
      data: productRAMS,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProductRAMS(req, res) {
  try {
    const productRAMSId = req.params.id;
    const productRAMS= await ProductRAMSModel.findById(productRAMSId)

    if (!productRAMS || productRAMS.length === 0) {
      return res.status(404).json({
        message: "No products RAMS found",
        success: false,
        error: true,
      });
    }

    const deleteProductRAMS = await ProductRAMSModel.findByIdAndDelete(productRAMSId);
    if (!deleteProductRAMS) {
      return res.status(404).json({
        message: "products RAMS not deleted",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "Product RAMS Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsRAMS(req, res) {
  try {
    const products = await ProductRAMSModel.find()
    if (!products) {
      res.status(400).json({
        message: "products are not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function addProductSize(req, res) {
  try {
    let productSize= new ProductSizeModel({
      name:req.body.name
    })

    productSize = await productSize.save();
    if (!productSize) {
      res.status(400).json({
      message: "Product Size is not added",
      error: true,
      success: false,
    });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "product Size Added",
      data: productSize,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProductSize(req, res) {
  try {
    const productSizeId = req.params.id;
    const productSize= await ProductSizeModel.findById(productSizeId)

    if (!productSize || productSize.length === 0) {
      return res.status(404).json({
        message: "No products Size found",
        success: false,
        error: true,
      });
    }

    const deleteProductSize = await ProductSizeModel.findByIdAndDelete(productSizeId);
    if (!deleteProductSize) {
      return res.status(404).json({
        message: "products Size not deleted",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "Product Size Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsSize(req, res) {
  try {
    const products = await ProductSizeModel.find()
    if (!products) {
      res.status(400).json({
        message: "products Size are not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function filters(req, res) {
  
    const {catId, subcatId, minPrice, maxPrice, rating, page, limit} = req.body;

    const filters = {}

    //check if previous any category selected that data also included
    if (catId?.length) {
      filters.catId = {$in: catId}
    }
     if (subcatId?.length) {
      filters.subcatId = {$in: subcatId}
    }
     if (minPrice || maxPrice) {
      filters.price = {$gte: +minPrice || 0, $lte : +maxPrice || Infinity};
    }
     if (rating?.length) {
      filters.rating = {$in: rating}
    }
  try {

    const products = await ProductModel.find(filters).populate("category").skip((page-1)*limit).limit(parseInt(limit))

    const total = await ProductModel.countDocuments(filters)
    return res.status(200).json({
      error: false,
      success: true,
      data:products,
      total: total,
      page:parseInt(page),
      totalPages:Math.ceil(total/limit)
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function sortBy(req, res) {
  try {
    const { products, sortBy, order } = req.body;

    if (!products || !sortBy || !order) {
      return res.status(400).json({
        error: true,
        message: "Missing sorting parameters",
      });
    }

    const sortedItems = [...products].sort((a, b) => {
      if (typeof a[sortBy] === "string") {
        return order === "asc"
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);
      }

      return order === "asc"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    });

    return res.status(200).json({
      error: false,
      success: true,
      products: sortedItems,
      page: 0,
      totalPages: 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function searchProductController(req, res) {
  try {
    const query = req.query.q;
    // console.log(query)
    if (!query) {
      return res.status(400).json({message:"query is required" ,success:false, error:true})
    }

    const items = await ProductModel.find({
      $or:[
        {name: {$regex: query, $options: "i"}},
        {brand: {$regex: query, $options: "i"}},
        {catName: {$regex: query, $options: "i"}},
        {subcatName: {$regex: query, $options: "i"}},
      ]
    }).populate("category")

    
    return res.status(200).json({
      error: false,
      success: true,
      products: items,
    });
  } catch (error) {
     return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}