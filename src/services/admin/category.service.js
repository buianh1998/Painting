import categoryModel from "./../../models/categori.model";
import { transErrors } from "./../../../lang/vi.lang";
let findCate = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let datacate = await categoryModel.findCate();
            resolve(datacate);
        } catch (error) {
            reject(error);
        }
    });
};
let createCate = (item) => {
    return new Promise(async (resolve, reject) => {
        let findByTitle = await categoryModel.findByTitle(item.title);
        if (findByTitle) {
            return reject(transErrors.title_in_cate);
        }
        await categoryModel.createCate(item);
        resolve(true);
    });
};
let findIdCate = (idCate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataIdCate = await categoryModel.findIdCate(idCate);
            resolve(dataIdCate);
        } catch (error) {
            reject(error);
        }
    });
};
let updateCate = (idCate, item) => {
    return new Promise(async (resolve, reject) => {
        let findByTitle = await categoryModel.findByTitle(item.title);
        if (findByTitle) {
            return reject(transErrors.title_in_cate);
        }
        await categoryModel.updateCate(idCate, item);
        resolve(true);
    });
};
let removeCate = async (idCate) => {
    return categoryModel.removeCate(idCate);
};
module.exports = {
    findCate: findCate,
    findIdCate: findIdCate,
    createCate: createCate,
    updateCate: updateCate,
    removeCate: removeCate,
};
