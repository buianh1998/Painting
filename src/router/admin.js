import express from "express";
let router = express.Router();
import { layoutAdmin, category } from "./../controllers/admin/index.controller";

let routerInit = (app) => {
    router.get("/", layoutAdmin);
    router.get("/category", category.findCate);
    router.get("/category/edit-cate/:idcate", category.findIdCate);
    router.post("/category/edit-cate/:idcate", category.updateCate);
    router.post("/category/add-category", category.createCate);
    router.get("/category/remove-cate/:idcate", category.removeCate);
    app.use("/admin", router);
};

module.exports = routerInit;
