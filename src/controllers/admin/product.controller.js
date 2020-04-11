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
            errArr.push(errImage);
            req.flash("errors", errArr);
            return res.redirect("/admin/product");
        }
        let errorValid = validationResult(req);
        console.log(errorValid.mapped());

        if (!errorValid.isEmpty()) {
            let errors = Object.values(errorValid.mapped());
            errors.forEach((item) => {
                errArr.push(item.msg);
            });
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
let findProductById = async (req, res) => {
    let { idProduct } = req.params;
    let dataIdProduct = await product.findProductById(idProduct);
    let dataCategory = await category.findCate();

    return res.render("admin/blocks/content/content", {
        page: "product/editProduct",
        dataIdProduct: dataIdProduct,
        dataCategory: dataCategory,
        errors: req.flash("errors"),
        success: req.flash("success"),
    });
};
let updateProduct = (req, res) => {
    let { idProduct } = req.params;
    let errArr = [];
    let successArr = [];
    upload(req, res, async (errImage) => {
        if (errImage) {
            if (errImage.message) {
                errArr.push(transProductErrors.iamge_product_limit);
                req.flash("errors", errArr);
                return res.redirect(`/admin/product/edit-product/${idProduct}`);
            }
            errArr.push(errImage);
            req.flash("errors", errArr);
            return res.redirect(`/admin/product/edit-product/${idProduct}`);
        }
        let { title, price, amount, idCate, description } = req.body;
        let item = {
            title,
            price,
            description,
            amount,
            image: typeof req.file !== "undefined" ? req.file.filename : req.body.imageold,
            idCate,
        };
        try {
            await product.updateProduct(idProduct, item);
            successArr.push(transSuccess.update_product_success);
            req.flash("success", successArr);
            return res.redirect("/admin/product");
        } catch (error) {
            res.status(400).send(error);
        }
    });
};
let removeProduct = async (req, res) => {
    try {
        let idProduct = req.body.idProduct;
        let removeProduct = await product.removeProduct(idProduct);
        res.status(200).send({ success: !!removeProduct });
    } catch (error) {
        console.log(errors);
        res.send(error);
    }
};
module.exports = {
    getProduct: getProduct,
    findProductById: findProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct,
};
