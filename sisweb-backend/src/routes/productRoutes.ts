import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  modifyProduct,
  getChartData,
} from '../controllers/productController';

const productRouter:Router = Router(); 

productRouter.get('/chart', getChartData);

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductById);

productRouter.post('/', createProduct);

productRouter.patch('/:id', modifyProduct);

productRouter.delete('/:id', deleteProduct);


export default productRouter;