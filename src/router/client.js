import express from "express";
let router = express.Router();
import { home } from "./../controllers/home/index.controller";
let clientRouteInit = (app) => {
    router.get("/", home.getHomePage);
    router.get("/products", home.getProductPage);
    router.get("/product/detail-product/:idproduct", home.getDetailProduct);
    router.get("/product/product-cate/:idcate", home.getProductOnCate);
    app.use("/", router);
};
module.exports = clientRouteInit;
