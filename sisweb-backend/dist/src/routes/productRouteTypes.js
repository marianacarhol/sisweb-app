"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productTypeController_1 = require("../controllers/productTypeController");
const productRouter = (0, express_1.Router)();
productRouter.get('/product-ids/:productTypeId', productTypeController_1.getProductIdsByProductType);
/*productRouter.get('/', (req:Request, res:Response) => {
res.send('Get a list of products')
});*/
productRouter.get('/', productTypeController_1.getAllProductTypes);
/*productRouter.get('/:id', (req:Request, res:Response) => {
res.send(`Get the product ${req.params.id}`)
});*/
productRouter.get('/:id', productTypeController_1.getProductTypeById);
/*productRouter.post('/', (req:Request, res:Response) => {
res.send(`Create a new product with ID: ${req.body.id}`)
});*/
productRouter.post('/', productTypeController_1.createProductType);
/*productRouter.patch('/:id', (req:Request, res:Response) => {
res.send(`Update the product ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`)
});*/
productRouter.patch('/:id', productTypeController_1.modifyProductType);
/*productRouter.delete('/', (req:Request, res:Response) => {
res.send(`Deleting the product ${req.body.id}`)
});*/
productRouter.delete('/', productTypeController_1.deleteProductType);
exports.default = productRouter;
