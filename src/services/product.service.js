import productModel from "./../models/product.model";
import { transProductErrors, transSuccess } from "./../../lang/vi.lang";
const LIMIT_PRODUCT_PAGE = 12;
let getProduct = (page) => {
    return new Promise(async (resolve, reject) => {
        let start = (page - 1) * LIMIT_PRODUCT_PAGE;
        let getProduct = await productModel.getProduct(start, LIMIT_PRODUCT_PAGE);
        let countDataProduct = await productModel.countDataProduct();
        let PagesProduct = Math.ceil(countDataProduct / LIMIT_PRODUCT_PAGE);
        resolve({ getProduct, PagesProduct });
    });
};
let getNewProductLimited = () => {
    return new Promise(async (resolve, reject) => {
        let getProduct = await productModel.getNewProductLimited();
        resolve(getProduct);
    });
};
let getProductOnCate = (idcate) => {
    return new Promise(async (resolve, reject) => {
        let getProduct = await productModel.getProductOnCate(idcate);
        resolve(getProduct);
    });
};
let createProduct = (item) => {
    return new Promise(async (resolve, reject) => {
        let dataProduct = await productModel.findByTitle(item.title);
        if (dataProduct) {
            return reject(transProductErrors.title_in_product);
        }
        await productModel.createProduct(item);
        resolve(true);
    });
};
let updateProduct = (idProduct, item) => {
    return productModel.updateProduct(idProduct, item);
};
let findProductById = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let findProductById = productModel.findProductById(item);
            resolve(findProductById);
        } catch (error) {
            reject(error);
        }
    });
};
let removeProduct = (item) => {
    return productModel.removeProduct(item);
};
let searchDataProduct = (item) => {
    return new Promise(async (resolve, reject) => {
        let findProductById = productModel.searchDataProduct(item);
        if (!findProductById) {
            reject([]);
        }
        resolve(findProductById);
    });
};
module.exports = {
    getProduct: getProduct,
    findProductById: findProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct,
    getNewProductLimited: getNewProductLimited,
    getProductOnCate: getProductOnCate,
    searchDataProduct: searchDataProduct,
};
