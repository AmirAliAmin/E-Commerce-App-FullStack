import {Router} from 'express'
import auth from '../middleware/auth.js';
import { createOrderController, getAllOrder, getDashboardStats, getOrderDetailsController, totalSaleController, totalUsersController } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post("/create", auth,createOrderController);
orderRouter.get("/get", auth,getOrderDetailsController);
orderRouter.get("/all", auth,getAllOrder);
orderRouter.get('/sales', auth, totalSaleController);
orderRouter.get('/totalusers', auth, totalUsersController)
orderRouter.get('/dashboard-stats', auth, getDashboardStats)



export default orderRouter;