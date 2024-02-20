import  {Router} from 'express';

const dataRouter = Router();
import { foodData, myOrderData, orderData } from '../controllers/data.controller.js';

dataRouter.post('/orderData', orderData);
dataRouter.get('/foodData', foodData);
dataRouter.post('/myOrderData', myOrderData);

export default dataRouter;