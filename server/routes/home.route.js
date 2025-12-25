import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createHomeBanner, deleteHomeBanner, getAllHomeBanners, removeHomeBannerFromCloudinary, uploadHomeBanner } from '../controllers/home.controller.js';


const homeRouter = Router();

homeRouter.post('/create',auth ,createHomeBanner);
homeRouter.put('/uploadImage',auth,upload.array('images') ,uploadHomeBanner);
homeRouter.delete('/deleteImage' ,auth, removeHomeBannerFromCloudinary);
homeRouter.delete('/delete/:id' ,deleteHomeBanner);
homeRouter.get('/get' ,getAllHomeBanners);


export default homeRouter;