import express from "express";
let router = express.Router();
import { layoutAdmin, category } from "./../controllers/admin/index.controller";

let routerInit = app => {
    router.get("/", layoutAdmin);
    router.get("/category/", category.dataCategory);
    app.use("/admin", router);
};

module.exports = routerInit;
