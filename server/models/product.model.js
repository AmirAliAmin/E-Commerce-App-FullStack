import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
       type: String,
        required:true
    },
    description:{
       type: String,
        required:true
    },
    images:[{
       type: String,
        required:true
    }],
    brand:{
       type: String,
       default:""
    },
    price:{
       type: Number,
        default:0
    },
    oldprice:{
       type: Number,
        default:0
    },
    catName:{
       type: String,
       default:""
    },
    catId:{
       type: String,
       default:""
    },
    subcatName:{
       type: String,
       default:""
    },
    subcatId:{
       type: String,
       default:""
    },
    thirdsubcat:{
       type: String,
       default:""
    },
    thirdsubcatId:{
       type: String,
       default:""
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
      //   required:true,
    },
    countInStock:{
       type: Number,
       required:true
    },
    rating:{
       type: Number,
       default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    discount:{
        type:Number,
        required:true
    },
    sale:{
      type:Number,
      default:0
    },
    productRam:[
        {
       type: String,
       default:null
    },
    ],
    size:[
        {
       type: String,
       default:null
    },
    ],
    productWeight:[
        {
       type: String,
       default:null
    },
    ],
    dateCreated:{
       type: Date,
       default:Date.now,
    },
},{timestamps:true})

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;