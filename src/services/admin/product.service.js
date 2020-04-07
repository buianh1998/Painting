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

module.exports = {
    getProduct: getProduct,
    createProduct: createProduct,
};
