import express from "express";
import connectDB from "./config/connectDB";
import categoryModel from "./models/categori.model";

var app = express();
//connect Mongodb
connectDB();

app.get("/", async (req, res, next) => {
    try {
        let item = {
            Title: "Tranh bộ năm"
        };
        let categoriItem = await categoryModel.createItem(item);
        res.json({ kq: true, dataCate: categoriItem });
    } catch (error) {
        next(error);
    }
});
require("dotenv").config({});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    console.log(`Hello Man, I'm running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
});
