import { product, category } from "./../../services/index.services";
import multer from "multer";
import { uploadFile } from "./../../config/configUploadImage";
import fsExtra from "fs-extra";
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
    let page = req.query.page || 1;
    let dataCategory = await category.findCate();
    let dataPagesProduct = await product.getProduct(page);
    res.render("admin/blocks/content/content", {
        page: "product/addProduct",
        dataProduct: dataPagesProduct.getProduct,
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

        let { title, amount, idCate, description } = req.body;

        let arrPrice = [];
        for (const key in req.body) {
            const element = req.body[key];
            if (key.match(/^price/)) {
                let price = {}; // này tạo object rỗng
                price["price"] = element; // tới đây thì thêm vô object có key là price value là element
                let index = key.substr(key.length - 1); // giải thích nốt cái này nữa
                price["size"] = req.body[`size${index}`]; //nghĩa là price.size
                // tức là kiểu price bh nó là price nó là 1 cái mảng hay sao nói rõ ra nào
                arrPrice.push(price);
            }
        }
        // thi thoảng hay thấy tụi nó sài kiểu data[] kiểu này tức là sao á, đnag k hiểu lắm cái đó

        let item = {
            title,
            size: arrPrice,
            description,
            amount,
            image: req.file.filename,
            idCate,
        };
        console.log(item);

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
    let arrSize = [];
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
        let dataIdProduct = await product.findProductById(idProduct);
        let imageUpload = req.body.imageold;
        if (typeof req.file !== "undefined") {
            imageUpload = req.file.filename;
            await fsExtra.remove(`${uploadFile.image_directory}/${dataIdProduct.image}`);
        }
        for (const key in req.body) {
            let element = req.body[key];
            // key la ten cua bien, o bai nay la ten cua name
            // req.body[key] la gia tri bien ngoai ra co the goi thang gia tri theo kieu req.body["tenbien"]
            if (key.match(/^price/)) {
                let size = {};
                size["price"] = element;
                let index = key.substr(key.length - 1);
                size["size"] = req.body[`size${index}`];
                arrSize.push(size);
            }
        }
        let { title, amount, idCate, description } = req.body;
        let item = {
            title,
            size: arrSize,
            description,
            amount,
            image: imageUpload,
            idCate,
        };
        try {
            await product.updateProduct(idProduct, item);
            successArr.push(transSuccess.update_product_success);
            req.flash("success", successArr);
            return res.redirect("/admin/product");
        } catch (error) {
            console.log(error);

            res.status(400).send(error);
        }
    });
};
let removeProduct = async (req, res) => {
    try {
        let idProduct = req.body.idProduct;
        let removeProduct = await product.removeProduct(idProduct);

        await fsExtra.remove(`${uploadFile.image_directory}/${removeProduct.image}`);
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
