import { product, category } from "./../../services/admin/index.services";
import multer from "multer";
import { validationResult } from "express-validator";
import { uploadFile } from "./../../config/configUploadImage";
import { transProductErrors, transSuccess } from "./../../../lang/vi.lang";

let storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFile.image_directory);
    },
    filename: (req, file, cb) => {
        let math = uploadFile.image_type;
        if (math.indexOf(file.mimetype) === -1) {
            return cb(transProductErrors.image_product_incorrect, null);
        }
        let imageName = `${Date.now()}-${file.originalname}`;
        cb(null, imageName);
    },
});
let upload = multer({ storage: storageImage, limits: uploadFile.image_limit }).single("image");
let getProduct = async (req, res) => {
    let dataCategory = await category.findCate();
    let dataProduct = await product.getProduct();
    res.render("admin/blocks/content/content", {
        page: "product/addProduct",
        dataProduct: dataProduct,
        dataCategory: dataCategory,
        errors: req.flash("errors"),
        success: req.flash("success"),
    });
};
let createProduct = (req, res) => {
    let errArr = [];
    let successArr = [];
    upload(req, res, async (errImage) => {
        if (errImage) {
            if (errImage.message) {
                errArr.push(transProductErrors.iamge_product_limit);
                req.flash("errors", errArr);
                return res.redirect("/admin/product");
            }
            console.log(errImage);

            errArr.push(errImage);
            req.flash("errors", errArr);
            return res.redirect("/admin/product");
        }
        let { title, price, amount, idCate, description } = req.body;
        let item = {
            title,
            price,
            description,
            amount,
            image: req.file.filename,
            idCate,
        };
        try {
            await product.createProduct(item);
            successArr.push(transSuccess.new_product_success);
            req.flash("success", successArr);
            return res.redirect("/admin/product");
        } catch (error) {
            errArr.push(error);
            req.flash("errors", errArr);
            return res.redirect("/admin/product");
        }
    });
};
module.exports = {
    getProduct: getProduct,
    createProduct: createProduct,
};
