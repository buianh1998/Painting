import { product, category } from "./../../services/index.services";
let getHomePage = async (req, res) => {
    let getNewProductLimited = await product.getNewProductLimited();
    let getNewCateLimited = await category.getNewCateLimited();
    return res.render("client/blocks/content/content", {
        page: "home/home",
        getNewProductLimited: getNewProductLimited,
        getNewCateLimited: getNewCateLimited,
    });
};
let getProductPage = async (req, res) => {
    let pageProduct = req.query.page || 1;
    let dataPagesProduct = await product.getProduct(pageProduct);
    let getCate = await category.findCate();

    return res.render("client/blocks/content/content", {
        page: "product/product",
        currentPage: pageProduct,
        getProduct: dataPagesProduct.getProduct,
        pages: dataPagesProduct.PagesProduct,
        getCate: getCate,
    });
};
let getDetailProduct = async (req, res) => {
    let idproduct = req.params.idproduct;
    let dataIdProduct = await product.findProductById(idproduct);
    return res.render("client/blocks/content/content", { page: "detailProduct/detailProduct", dataIdProduct: dataIdProduct });
};
let getProductOnCate = async (req, res) => {
    let idcate = req.params.idcate;
    let getCate = await category.findCate();
    let getProductOnCate = await product.getProductOnCate(idcate);

    return res.render("client/blocks/content/content", {
        page: "product/productOnCate",
        getProductOnCate: getProductOnCate,
        getCate: getCate,
        idcate: idcate,
    });
};
let searchDataProduct = async (req, res) => {
    try {
        let search = req.query.search;
        let getCate = await category.findCate();
        let dataProduct = await product.searchDataProduct(search);
        res.render("client/blocks/content/content", { page: "search/search", dataProduct: dataProduct, getCate: getCate });
    } catch (error) {}
};

module.exports = {
    getHomePage: getHomePage,
    getProductPage: getProductPage,
    getDetailProduct: getDetailProduct,
    getProductOnCate: getProductOnCate,
    searchDataProduct: searchDataProduct,
};
