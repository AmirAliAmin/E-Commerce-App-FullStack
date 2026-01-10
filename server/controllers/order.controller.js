import { count, error } from "console";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import { stripe } from "../config/strip.js";
import dotenv from 'dotenv'
dotenv.config();

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

export const createStripCheckoutSession = async (req, res) => {
  try {
    const { product } = req.body; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: product.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.productTitle,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}checkout`,
    });

    return res.status(201).json({
      url: session.url,
      success: true,
      error: false,
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

    const months = [
      "JAN", "FEB", "MAR", "APRIL", "MAY", "JUNE",
      "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const monthlySales = months.map(month => ({
      name: month,
      totalSale: 0,
    }));

    let totalSale = 0;

    ordersList.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const year = orderDate.getFullYear();
      const monthIndex = orderDate.getMonth(); // 0–11

      if (year === currentYear) {
        const amount = Number(order.totalAmt) || 0;
        monthlySales[monthIndex].totalSale += amount;
        totalSale += amount;
      }
    });

    return res.status(200).json({
      totalSale,
      monthlySales,
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


export async function totalUsersController(req, res) {
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    let monthlyUsers = [
      {
        name: "JAN",
        totalUser: 0,
      },
      {
        name: "FEB",
        totalUser: 0,
      },
      {
        name: "MAR",
        totalUser: 0,
      },
      {
        name: "APRIL",
        totalUser: 0,
      },
      {
        name: "MAY",
        totalUser: 0,
      },
      {
        name: "JUNE",
        totalUser: 0,
      },
      {
        name: "JULY",
        totalUser: 0,
      },
      {
        name: "AUG",
        totalUser: 0,
      },
      {
        name: "SEP",
        totalUser: 0,
      },
      {
        name: "OCT",
        totalUser: 0,
      },
      {
        name: "NOV",
        totalUser: 0,
      },
      {
        name: "DEC",
        totalUser: 0,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.month === 1) {
        monthlyUsers[0] = {
          name: "JAN",
          totalUser: users[i].count,
        };
      }

      if (users[i]?._id?.month === 2) {
        monthlyUsers[1] = {
          name: "FEB",
          totalUser: users[i].count,
        };
      }

      if (users[i]?._id?.month === 3) {
        monthlyUsers[2] = {
          name: "MAR",
          totalUser: users[i].count,
        };
      }
     if (users[i]?._id?.month === 4) {
        monthlyUsers[3] = {
          name: "APRIL",
          totalUser: users[i].count,
        };
      }

     if (users[i]?._id?.month === 5) {
        monthlyUsers[4] = {
          name: "MAY",
          totalUser: users[i].count,
        };
      }
      if (users[i]?._id?.month === 6) {
        monthlyUsers[5] = {
          name: "JUNE",
          totalUser: users[i].count,
        };
      }

      if (users[i]?._id?.month === 7) {
        monthlyUsers[6] = {
          name: "JULY",
          totalUser: users[i].count,
        };
      }

      if (users[i]?._id?.month === 8) {
        monthlyUsers[7] = {
          name: "AUG",
          totalUser: users[i].count,
        };
      }

     if (users[i]?._id?.month === 9) {
        monthlyUsers[8] = {
          name: "SEP",
          totalUser: users[i].count,
        };
      }

      if (users[i]?._id?.month === 10) {
        monthlyUsers[9] = {
          name: "OCT",
          totalUser: users[i].count,
        };
      }
      if (users[i]?._id?.month === 11) {
        monthlyUsers[10] = {
          name: "NOV",
          totalUser: users[i].count,
        };
      }
      if (users[i]?._id?.month === 12) {
        monthlyUsers[11] = {
          name: "DEC",
          totalUser: users[i].count,
        };
      }
      
    }
    
     return res.status(200).json({
      totalUser: monthlyUsers,
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

export async function getDashboardStats(req, res) {
  try {
    const totalUsers = await UserModel.countDocuments();

    const orders = await OrderModel.find();

    const totalSales = orders.reduce((sum, order) => sum + (order.totalAmt || 0), 0);

    return res.status(200).json({
      error: false,
      success: true,
      data: {
        totalUsers,
        totalSales,
        totalOrders: orders.length,
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

