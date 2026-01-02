import {Router} from 'express'
import auth from '../middleware/auth.js';
import { createOrderController, getAllOrder, getOrderDetailsController } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post("/create", auth,createOrderController);
orderRouter.get("/get", auth,getOrderDetailsController);
orderRouter.get("/all", auth,getAllOrder);


export default orderRouter;