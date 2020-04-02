import express from "express";
import connectDB from "./config/connectDB";
import configEngine from "./config/viewEngine";
import routerInit from "./router/admin";
var app = express();
//connect Mongodb
connectDB();
configEngine(app);
routerInit(app);

require("dotenv").config({});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    console.log(`Hello Man, I'm running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
});
