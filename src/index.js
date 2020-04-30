import express from "express";
import connectDB from "./config/connectDB";
import configEngine from "./config/viewEngine";
import routerInit from "./router/admin";
import authRouterInit from "./router/auth";
import clientRouteInit from "./router/client";
import bodyParser from "body-parser";
import configSession from "./config/configSession";
import connectFlash from "connect-flash";
import passport from "passport";
import configCart from "./config/configCart";
var app = express();
//connect Mongodb
connectDB();
//congig session
configSession(app);
//config view ejs for project
configEngine(app);
//config bodyParser for project
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//connect flash
app.use(connectFlash());
// config passport
app.use(passport.initialize());
app.use(passport.session());
// config cart
configCart(app);
//config router for project
routerInit(app);
authRouterInit(app);
clientRouteInit(app);
//config dotenv for project
require("dotenv").config({});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    console.log(`Hello Man, I'm running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
});
