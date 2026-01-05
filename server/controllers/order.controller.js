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

export async function totalSaleController(req, res) {
  try {
    const currentYear = new Date().getFullYear();

    const ordersList = await OrderModel.find();

    let totalSale = 0;
    let monthlySales = [
      {
        name: "JAN",
        totalSale: 0,
      },
      {
        name: "FEB",
        totalSale: 0,
      },
      {
        name: "MAR",
        totalSale: 0,
      },
      {
        name: "APRIL",
        totalSale: 0,
      },
      {
        name: "MAY",
        totalSale: 0,
      },
      {
        name: "JUNE",
        totalSale: 0,
      },
      {
        name: "JULY",
        totalSale: 0,
      },
      {
        name: "AUG",
        totalSale: 0,
      },
      {
        name: "SEP",
        totalSale: 0,
      },
      {
        name: "OCT",
        totalSale: 0,
      },
      {
        name: "NOV",
        totalSale: 0,
      },
      {
        name: "DEC",
        totalSale: 0,
      },
    ];

    for (let i = 0; i < ordersList.length; i++) {
     totalSale = totalSale + parseInt(ordersList[i].totalAmt);
     const str = JSON.stringify(ordersList[i].createdAt);
     const year = str.substr(1,4);
     const monthStr = str.substr(6,8);
     const month = parseInt(monthStr.substr(0,2));

     if (currentYear === year) {
      if (month === 1) {
        monthlySales[0] = {
          name:'JAN',
          totalSale:monthlySales[0].totalSale = parseInt(monthlySales[0].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }

      if (month === 2) {
        monthlySales[1] = {
          name:'FEB',
          totalSale:monthlySales[1].totalSale = parseInt(monthlySales[1].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }

      if (month === 3) {
        monthlySales[2] = {
          name:'MAR',
          totalSale:monthlySales[2].totalSale = parseInt(monthlySales[2].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }


      if (month === 4) {
        monthlySales[3] = {
          name:'APRIL',
          totalSale:monthlySales[3].totalSale = parseInt(monthlySales[3].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }

      if (month === 5) {
        monthlySales[4] = {
          name:'MAY',
          totalSale:monthlySales[4].totalSale = parseInt(monthlySales[4].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }
      if (month === 6) {
        monthlySales[5] = {
          name:'JUNE',
          totalSale:monthlySales[5].totalSale = parseInt(monthlySales[5].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }

      if (month === 7) {
        monthlySales[6] = {
          name:'JULY',
          totalSale:monthlySales[6].totalSale = parseInt(monthlySales[6].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }

      if (month === 8) {
        monthlySales[7] = {
          name:'AUG',
          totalSale:monthlySales[8].totalSale = parseInt(monthlySales[8].totalSale) + parseInt(ordersList[i].totalAmt)
        }
      }
     }
    }
  } catch (error) {}
}
