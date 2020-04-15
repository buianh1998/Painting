import { product, category } from "./../../services/index.services";
import productModel from "./../../models/product.model";
let getHomePage = async (req, res) => {
    let getNewProductLimited = await product.getNewProductLimited();
    let getNewCateLimited = await category.getNewCateLimited();
    res.render("client/blocks/content/content", {
        page: "home/home",
        getNewProductLimited: getNewProductLimited,
        getNewCateLimited: getNewCateLimited,
    });
};
let getProductPage = async (req, res) => {
    let page = req.query.page || 1;
    let getProduct = await product.getProduct(page);
    let getCate = await category.findCate();

    res.render("client/blocks/content/content", {
        page: "product/product",
        getProduct: getProduct,
        getCate: getCate,
    });
};
let getDetailProduct = async (req, res) => {
    let idproduct = req.params.idproduct;
    let dataIdProduct = await product.findProductById(idproduct);
    res.render("client/blocks/content/content", { page: "detailProduct/detailProduct", dataIdProduct: dataIdProduct });
};
let getProductOnCate = async (req, res) => {
    let idcate = req.params.idcate;
    let getCate = await category.findCate();
    let getProductOnCate = await product.getProductOnCate(idcate);

    res.render("client/blocks/content/content", { page: "product/productOnCate", getProductOnCate: getProductOnCate, getCate: getCate });
};
module.exports = {
    getHomePage: getHomePage,
    getProductPage: getProductPage,
    getDetailProduct: getDetailProduct,
    getProductOnCate: getProductOnCate,
};
