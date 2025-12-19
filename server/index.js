import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import myListRouter from './routes/mylist.route.js'
import addressRouter from './routes/address.route.js'


const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev")); 
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT = process.env.PORT || 8000
app.get("/",(req,res)=>{
    res.json({
        message: "Server is  running at",PORT
    })
});
app.use("/api",userRouter);
app.use("/api/category",categoryRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/mylist",myListRouter);
app.use("/api/address",addressRouter);



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running at", PORT)
    })
})