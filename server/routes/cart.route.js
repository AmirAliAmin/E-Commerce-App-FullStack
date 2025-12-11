import {Router} from 'express'
import auth from '../middleware/auth.js';
import { addtoCartItemController, deletecartItem, getCartItem, updateCartItemQty } from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/add', auth,addtoCartItemController);
cartRouter.get('/get', auth,getCartItem);
cartRouter.put('/update-qlty', auth, updateCartItemQty)
cartRouter.delete('/delete-cart-item', auth, deletecartItem)


export default cartRouter;