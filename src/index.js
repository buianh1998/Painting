import express from "express";
import connectDB from "./config/connectDB";
import categoryModel from "./models/categori.model";
var app = express();
//connect Mongodb
connectDB();
var hostname = "localhost";
var port = 3000;
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
app.listen(port, hostname, () => {
    console.log(`Hello Man, I'm running at ${hostname}:${port} `);
});
