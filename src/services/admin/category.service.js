import categoryModel from "./../../models/categori.model";

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
    return categoryModel.createCate(item);
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
    return categoryModel.updateCate(idCate, item);
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
