import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    subTotal:{
        type:Number,
        required:true,
    },
    productId:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const CartProductModel = mongoose.model('cart', cartSchema);
export default CartProductModel;