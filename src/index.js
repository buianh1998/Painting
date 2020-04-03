import express from "express";
import connectDB from "./config/connectDB";
import configEngine from "./config/viewEngine";
import routerInit from "./router/admin";
import bodyParser from "body-parser";

var app = express();
//connect Mongodb
connectDB();
//config view ejs for project
configEngine(app);
//config bodyParser for project
app.use(bodyParser.urlencoded({ extended: true }));
//config router for project
routerInit(app);
//config dotenv for project
require("dotenv").config({});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    console.log(`Hello Man, I'm running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
});
