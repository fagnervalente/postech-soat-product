import { Router } from "express";
import HttpUtils from "../HttpUtils";
import ProductAPIController from "../controllers/ProductAPIController";

const productRoutes = HttpUtils.asyncRouterHandler(Router());

productRoutes.get('/product/category/:categoryId', new ProductAPIController().getByCategory);
productRoutes.get('/product/:id', new ProductAPIController().getById);
productRoutes.post('/product/:categoryId', new ProductAPIController().create);
productRoutes.put('/product/:id', new ProductAPIController().update);
productRoutes.delete('/product/:id', new ProductAPIController().delete);

export default productRoutes;
