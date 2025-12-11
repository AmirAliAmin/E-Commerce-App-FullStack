import {Router} from 'express'
import { createCategory, deleteCategory, getCategories, getCategory, getCategoryCount, getSubCategoryCount, removeImageFromCloudinary, updateCategory } from '../controllers/category.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';


const categoryRouter = Router()
categoryRouter.post('/create',auth,upload.array('images') ,createCategory);
categoryRouter.get('/get/count' ,getCategoryCount);
categoryRouter.get('/sub/get/count' ,getSubCategoryCount);
categoryRouter.get('/:id' ,getCategory);
categoryRouter.get('/',getCategories);
categoryRouter.delete('/deleteImage' ,auth, removeImageFromCloudinary);
categoryRouter.delete('/:id' ,auth, deleteCategory);
categoryRouter.put('/:id', auth, upload.array('images'), updateCategory);




export default categoryRouter;