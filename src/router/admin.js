import express from "express";
let router = express.Router();
import { layoutAdmin, category } from "./../controllers/admin/index.controller";
import { adminValid } from "./../validation/indexValidation";

let routerInit = (app) => {
    router.get("/", layoutAdmin);
    router.get("/category", category.findCate);
    router.get("/category/edit-cate/:idcate", category.findIdCate);
    router.post("/category/edit-cate/:idcate", adminValid.cateValidate, category.updateCate);
    router.post("/category/add-category", adminValid.cateValidate, category.createCate);
    router.delete("/category/remove-cate", category.removeCate);
    app.use("/admin", router);
};

module.exports = routerInit;
