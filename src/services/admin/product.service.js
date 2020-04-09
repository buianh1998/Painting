import productModel from "./../../models/product.model";
import { transProductErrors, transSuccess } from "./../../../lang/vi.lang";

let getProduct = () => {
    return new Promise(async (resolve, reject) => {
        let getProduct = await productModel.getProduct();
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
    return new Promise(async (resolve, reject) => {
        let dataProduct = await productModel.findProductByTitle(item.title);
        if (dataProduct) {
            return reject(transProductErrors.title_in_product);
        }
        await productModel.updateProduct(idProduct, item);
        resolve(true);
    });
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
module.exports = {
    getProduct: getProduct,
    findProductById: findProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct,
};
