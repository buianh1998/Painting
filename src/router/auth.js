import express from "express";
import auth from "./../controllers/auth/auth.controller";
import passport from "passport";
auth.initPassportLocal();
let router = express.Router();

let authRouterInit = (app) => {
    router.get("/login-admin", auth.checkLogdedOut, auth.getLayoutLogin);
    router.post(
        "/login-admin",
        auth.checkLogdedOut,
        passport.authenticate("local", {
            failureRedirect: "/auth/login-admin",
            successRedirect: "/admin",
            failureFlash: true,
            successFlash: true,
        })
    );
    app.get("/auth/logout", auth.logOut);
    app.use("/auth", router);
};
module.exports = authRouterInit;
