import { Router } from 'express';
import {
  createProductType,
  deleteProductType,
  getAllProductTypes,
  getProductTypeById,
  modifyProductType,
  getProductIdsByProductType
} from '../controllers/productTypeController';

const productRouter:Router = Router(); 

productRouter.get('/product-ids/:productTypeId', getProductIdsByProductType);

productRouter.get('/', getAllProductTypes);

productRouter.get('/:id', getProductTypeById);

productRouter.post('/', createProductType);

productRouter.patch('/:id', modifyProductType);

productRouter.delete('/:id', deleteProductType);

export default productRouter;