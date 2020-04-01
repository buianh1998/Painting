import express from "express";
import connectDB from "./config/connectDB";
import categoryModel from "./models/categori.model";
import configEngine from "./config/viewEngine";
var app = express();
//connect Mongodb
connectDB();
configEngine(app);
app.get("/", (req, res) => {
    return res.render("admin/admin");
});
require("dotenv").config({});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    console.log(`Hello Man, I'm running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
});
