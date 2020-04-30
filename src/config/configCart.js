import session from "express-session";

let configCart = (app) => {
    app.use((req, res, next) => {
        res.locals.session = req.session;
        res.locals.cart = req.session.cart || {};
        next();
    });
};
module.exports = configCart;
