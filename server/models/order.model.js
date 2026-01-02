import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    product: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        image: {
          type: String,
        },
        subTotal: {
          type: Number,
        },
      },
    ],
    // orderId:{
    //     type: String,
    //     required:[true,"Provide orderId"],
    //     unique:true
    // },
    // productId:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"product"
    // },
    // product_detail :{
    //     type:String,
    //     image:Array
    // },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
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
      default: 0,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
