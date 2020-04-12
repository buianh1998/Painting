import passport from "passport";
import passportLocal from "passport-local";
import adminModel from "./../../models/admin.model";
import { transLoginErrors, tranAdminErros, transSuccess } from "./../../../lang/vi.lang";
let localStorage = passportLocal.Strategy;
let getLayoutLogin = (req, res) => {
    res.render("auth/adminAuth", { errors: req.flash("errors"), success: req.flash("success") });
};
let initPassportLocal = () => {
    passport.use(
        new localStorage(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, username, password, done) => {
                try {
                    let admin = await adminModel.findAdminByEmail(username);
                    if (!admin) {
                        return done(null, false, req.flash("errors", transLoginErrors.email_login_false));
                    }
                    let passwordCompare = await admin.checkPassword(password);
                    if (!passwordCompare) {
                        return done(null, false, req.flash("errors", transLoginErrors.password_login_false));
                    }
                    return done(null, admin);
                } catch (error) {
                    return done(null, false, req.flash("errors", transLoginErrors.server_error));
                }
            }
        )
    );
    // save data user login to session
    passport.serializeUser((admin, done) => done(null, admin._id));
    passport.deserializeUser((id, done) => {
        adminModel
            .findAdminById(id)
            .then((admin) => done(null, admin))
            .catch((err) => done(err, null));
    });
};
let logOut = (req, res) => {
    req.logout();
    req.flash("success", transSuccess.logout_admin_success);
    res.redirect("/auth/login-admin");
};
let checkLogdedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login-admin");
    }
    console.log(req.user);
    res.locals.user = req.user;
    next();
};
let checkLogdedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/admin/admin");
    }
    next();
};
module.exports = {
    getLayoutLogin: getLayoutLogin,
    initPassportLocal: initPassportLocal,
    checkLogdedIn: checkLogdedIn,
    checkLogdedOut: checkLogdedOut,
    logOut: logOut,
};
