import mongoose from "mongoose";

const productRAMSchema = new mongoose.Schema({
    name:{
       type: String,
        required:true
    },
    dateCreated:{
       type: Date,
       default:Date.now,
    },
},{timestamps:true})

const ProductRAMSModel = mongoose.model('ProductRAMS', productRAMSchema);
export default ProductRAMSModel;