import express from "express";
let router = express.Router();
import { admin, category, product } from "./../controllers/admin/index.controller";
import { adminValid } from "./../validation/indexValidation";
import auth from "./../controllers/auth/auth.controller";

let routerInit = (app) => {
    router.get("/", admin.layoutAdmin);
    router.get("/category", category.findCate);
    router.get("/category/edit-cate/:idcate", category.findCateById);
    router.post("/category/edit-cate/:idcate", adminValid.cateValidate, category.updateCate);
    router.post("/category/add-category", adminValid.cateValidate, category.createCate);
    router.delete("/category/remove-cate", category.removeCate);
    router.get("/product", product.getProduct);
    router.post("/product/add-product", product.createProduct);
    router.get("/product/edit-product/:idProduct", product.findProductById);
    router.post("/product/edit-product/:idProduct", product.updateProduct);
    router.delete("/product/remove-product", product.removeProduct);
    router.get("/admin", admin.checkPowerAdmin, admin.getAdmin);
    router.post("/admin/add-admin", admin.checkPowerAdmin, admin.createAdmin);
    router.get("/admin/edit-admin/:idAdmin", admin.checkPowerAdmin, admin.findAdminById);
    router.post("/admin/edit-admin/:idAdmin", admin.checkPowerAdmin, admin.editAdmin);
    router.get("/edit-id-admin/:idAdmin", admin.findIdAdminById);
    router.post("/edit-id-admin/:idAdmin", admin.editIdAdmin);
    router.delete("/admin/delete-admin", admin.checkPowerAdmin, admin.deleteAdmin);
    app.use("/admin", auth.checkLogdedIn, router);
};

module.exports = routerInit;
