import categoryModel from "./../models/categori.model";
import { transErrors } from "./../../lang/vi.lang";
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
let getNewCateLimited = () => {
    return new Promise(async (resolve, reject) => {
        let datacate = await categoryModel.findCate();
        resolve(datacate);
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
let findCateById = (idCate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataIdCate = await categoryModel.findCateById(idCate);
            resolve(dataIdCate);
        } catch (error) {
            reject(error);
        }
    });
};
let updateCate = (idCate, item) => {
    return categoryModel.updateCate(idCate, item);
};
let removeCate = async (idCate) => {
    return categoryModel.removeCate(idCate);
};
module.exports = {
    findCate: findCate,
    getNewCateLimited: getNewCateLimited,
    findCateById: findCateById,
    createCate: createCate,
    updateCate: updateCate,
    removeCate: removeCate,
};
