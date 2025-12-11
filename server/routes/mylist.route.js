import {Router} from 'express'
import auth from '../middleware/auth.js';
import { addMyListController, deleteToMyListController, getMyListController } from '../controllers/myList.controller.js';

const myListRouter = Router();
myListRouter.post('/add',auth ,addMyListController);
myListRouter.get('/get',auth ,getMyListController);
myListRouter.delete('/delete/:id',auth ,deleteToMyListController);

export default myListRouter;