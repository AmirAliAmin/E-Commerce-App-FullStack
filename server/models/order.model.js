import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    product:[
        {
            productId:{
                type:String,
            },
            productTitle:{
                type:String,
            },
            quantity:{
                type:Number,
            },
            price:{
                type:Number,
            },
            image:{
                type:String
            },
            subTotal:{
                type:String,
            },
        }
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
    paymentId :{
        type:String,
        default:""
    },
    payment_status :{
        type:String,
        default:""
    },
    order_Status:{
         type:String,
        default:"pending"
    },
    delivery_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    totalAmt:{
        type:Number,
        default:0,
    },
},{timestamps:true})

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel