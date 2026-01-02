import {Router} from 'express'
import auth from '../middleware/auth.js';
import { addAddressController, addressDetail, updateAddressDetails } from '../controllers/address.controller.js';

const addressRouter = Router();

addressRouter.post('/add', auth,addAddressController);
addressRouter.get('/addressdetail',auth,addressDetail);
addressRouter.put('/:id',auth,updateAddressDetails);

export default addressRouter;