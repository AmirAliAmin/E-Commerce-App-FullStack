import { error } from "console";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";

export const createOrderController = async (req, res) => {
  try {
    let order = new OrderModel({
      userId: req.body.userId,
      product: req.body.product,
      paymentId: req.body.paymentId,
      payment_status: req.body.payment_status,
      delivery_address: req.body.delivery_address,
      order_Status: req.body.order_Status,
      totalAmt: req.body.totalAmt,
      date: req.body.userId,
    });
    if (!order) {
      res.status(400).json({
        error: true,
        success: false,
      });
    }

    for (let i = 0; i < req.body.product.length; i++) {
      await ProductModel.findByIdAndUpdate(
        req.body.product[i].productId,
        {
          countInStock: parseInt(
            req.body.product[i].countInStock - req.body.product[i].quantity
          ),
        },
        { new: true }
      );
    }
    order = await order.save();

    return res.status(200).json({
      error: false,
      success: true,
      message: "Order Placed",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getOrderDetailsController = async (req, res) => {
  try {
    const userId = req.userId;

    const orderlist = await OrderModel.find({userId: userId}).sort({createdAt:-1}).populate('delivery_address, User')

    return res.json({
        message:"Order List",
        data: orderlist,
        error:false,
        success:true
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
