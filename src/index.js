import express from "express";
import connectDB from "./config/connectDB";
import configEngine from "./config/viewEngine";
import routerInit from "./router/admin";
import bodyParser from "body-parser";
import configSession from "./config/configSession";
import connectFlash from "connect-flash";
var app = express();
//connect Mongodb
connectDB();
//congig session
configSession(app);
//config view ejs for project
configEngine(app);
//config bodyParser for project
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//connect flash
app.use(connectFlash());
//config router for project
routerInit(app);
//config dotenv for project
require("dotenv").config({});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    console.log(`Hello Man, I'm running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
});
