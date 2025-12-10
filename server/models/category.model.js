import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        default:''
    },
    images:[{
        type:String
    }],
    parentCatName:{
        type:String,
    },
    parentCatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null,
    }

},{timestamps:true});

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;