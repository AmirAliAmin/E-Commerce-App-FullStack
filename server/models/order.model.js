import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        productTitle: String,
        image: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        subTotal: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["COD", "STRIPE", "JAZZCASH"],
      default: "COD",
    },

    payment_status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    paymentId: String,
    stripeSessionId: String,
    stripePaymentIntentId: String,

    order_Status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },

    delivery_address: {
      address_line: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      mobile: String,
    },

    totalAmt: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
