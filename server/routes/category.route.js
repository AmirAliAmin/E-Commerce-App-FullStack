import {Router} from 'express'
import { createCategory, deleteCategory, getCategories, getCategory, getCategoryCount, getSubCategoryCount, removeImageFromCloudinary, updateCategory, uploadCategoryImages } from '../controllers/category.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';


const categoryRouter = Router()
categoryRouter.post('/create' ,createCategory);
categoryRouter.put('/upload',auth,upload.array('images') ,uploadCategoryImages);
categoryRouter.get('/get/count' ,getCategoryCount);
categoryRouter.get('/sub/get/count' ,getSubCategoryCount);
categoryRouter.get('/get/:id' ,getCategory);
categoryRouter.get('/',getCategories);
categoryRouter.delete('/deleteImage' ,auth, removeImageFromCloudinary);
categoryRouter.delete('/delete/:id' ,auth, deleteCategory);
categoryRouter.put('/update/:id', auth, upload.array('images'), updateCategory);




export default categoryRouter;