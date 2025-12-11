import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createProduct, deleteProduct, getProductByCatId, getProductByCatName, getProductById, getProductByPrice, getProductByRating, getProductBySubCatId, getProductBySubCatName, getProductByThirdSubCatId, getProductByThirdSubCatName, getProducts, getProductsToatalCount, getProductThatisFeatured, removeImageFromCloudinary } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/create',auth,upload.array('images') ,createProduct);
productRouter.get('/all-product' ,getProducts);
productRouter.get('/getbycatgoryname' ,getProductByCatName);
productRouter.get('/getbycatgoryid/:id' ,getProductByCatId);
productRouter.get('/getbysubcatgoryname' ,getProductBySubCatName);
productRouter.get('/getbysubcatgoryid/:id' ,getProductBySubCatId);
productRouter.get('/getbythirdsubcatgoryname' ,getProductByThirdSubCatName);
productRouter.get('/getbythirdsubcatgoryid/:id' ,getProductByThirdSubCatId);
productRouter.get('/getbyprice' ,getProductByPrice);
productRouter.get('/getbyrating' ,getProductByRating);
productRouter.get('/getproductcount' ,getProductsToatalCount);
productRouter.get('/getfeaturedproduct' ,getProductThatisFeatured);
productRouter.get('/:id' ,getProductById);
productRouter.delete('/:id' ,deleteProduct);
productRouter.delete('/deleteImage' ,auth, removeImageFromCloudinary);

export default productRouter;