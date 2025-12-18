import {Router} from 'express'
import { forgotPasswordController, loginUserController, logoutController, refreshToken, registerUserController, removeImageFromCloudinary, restPassword, updatePassword, updateUserDetails, userAvatarController, userDetails, verifyEmailController, verifyForgotPasswordOtp } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';



const userRouter = Router()
userRouter.post('/register', registerUserController);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout',auth ,logoutController);
userRouter.put('/user-avatar',auth,upload.array('avatar') ,userAvatarController);
userRouter.delete('/deleteImage',auth ,removeImageFromCloudinary);
userRouter.post('/forgot-password',forgotPasswordController);
userRouter.post('/verify-forgot-password-otp',verifyForgotPasswordOtp);
userRouter.put('/password/reset',restPassword);
userRouter.put('/password/update',updatePassword);
userRouter.put('/:id',auth ,updateUserDetails);
userRouter.post('/refresh-token', refreshToken);
userRouter.get('/userdetail',auth,userDetails);


export default userRouter;