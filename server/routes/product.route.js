import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { addProductRAMS, addProductSize, createProduct, deleteProduct, deleteProductRAMS, deleteProductSize, getProductByCatId, getProductByCatName, getProductById, getProductByPrice, getProductByRating, getProductBySubCatId, getProductBySubCatName, getProductByThirdSubCatId, getProductByThirdSubCatName, getProducts, getProductsRAMS, getProductsSize, getProductsToatalCount, getProductThatisFeatured, removeImageFromCloudinary, updateProductbyId, uploadProductImages } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/create',auth ,createProduct);
productRouter.put('/uploadImage',auth,upload.array('images') ,uploadProductImages);
productRouter.get('/allproduct' ,getProducts);
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
productRouter.get('/get/:id' ,getProductById);
productRouter.delete('/delete/:id' ,deleteProduct);
productRouter.delete('/deleteImage' ,auth, removeImageFromCloudinary);
productRouter.put('/update/:id',auth ,updateProductbyId);
productRouter.delete('/productRAMS/delete/:id' ,deleteProductRAMS);
productRouter.post('/productRAMS/add',auth ,addProductRAMS);
productRouter.get('/allproductRAMS' ,getProductsRAMS);
productRouter.delete('/productSize/delete/:id' ,deleteProductSize);
productRouter.post('/productSize/add',auth ,addProductSize);
productRouter.get('/allproductSize' ,getProductsSize);


export default productRouter;