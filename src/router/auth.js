import express from "express";
import auth from "./../controllers/auth/auth.controller";
let router = express.Router();

let authRouterInit = (app) => {
    router.get("/login-admin", auth.getLayoutLogin);
    app.use("/auth", router);
};
module.exports = authRouterInit;
