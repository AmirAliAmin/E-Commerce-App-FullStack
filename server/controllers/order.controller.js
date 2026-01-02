import { error } from "console";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";

export const createOrderController = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.product?.length) {
      return res.status(400).json({
        message: "Invalid order data",
        error: true,
        success: false,
      });
    }

    for (let item of req.body.product) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          error: true,
          success: false,
        });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          message: "Product out of stock",
          error: true,
          success: false,
        });
      }

      product.countInStock -= item.quantity;
      await product.save();
    }

    const order = await OrderModel.create({
      userId: req.body.userId,
      product: req.body.product,
      paymentId: req.body.paymentId || "COD",
      payment_status: req.body.payment_status || "PENDING",
      delivery_address: req.body.delivery_address,
      order_Status: "PENDING",
      totalAmt: req.body.totalAmt,
    });

    return res.status(201).json({
      message: "Order Placed Successfully",
      data: order,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export const getOrderDetailsController = async (req, res) => {
  try {
    const userId = req.userId;

    const orderlist = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    return res.json({
      message: "Order List",
      data: orderlist,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export async function getAllOrder(req, res) {
  try {
    const order = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    if (!order) {
      res.status(400).json({
        message: "orders are not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
