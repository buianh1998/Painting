import express from "express";
import expressEjsExtend from "express-ejs-extend";
/**
 *
 * Config view engine for app
 */
let configEngine = app => {
    app.use(express.static("./src/public"));
    app.engine("ejs", expressEjsExtend);
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = configEngine;
