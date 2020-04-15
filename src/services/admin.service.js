import adminModel from "./../models/admin.model";
import bcryptjs from "bcryptjs";
import { tranAdminErros, transSuccess } from "./../../lang/vi.lang";

let salt = bcryptjs.genSaltSync(10);

let getAdmin = () => {
    return new Promise(async (resolve, reject) => {
        let dataAdmin = await adminModel.getAdmin();
        resolve(dataAdmin);
    });
};
let findAdminById = (idAdmin) => {
    return new Promise(async (resolve, reject) => {
        let dataIdAdmin = await adminModel.findAdminById(idAdmin);
        resolve(dataIdAdmin);
    });
};
let createAdmin = (item) => {
    return new Promise(async (resolve, reject) => {
        let dataIdAdmin = await adminModel.findAdminByEmail(item.username);
        if (dataIdAdmin) {
            return reject(tranAdminErros.username_in_admin);
        }
        let dataAdmin = {
            username: item.username,
            password: bcryptjs.hashSync(item.password, salt),
            avatar: item.avatar,
            position: item.position,
            fullname: item.username.split("@")[0],
        };
        await adminModel.createAdmin(dataAdmin);
        resolve(true);
    });
};
let editAdmin = (idAdmin, item) => {
    let dataAdmin = {
        password: bcryptjs.hashSync(item.password, salt),
        avatar: item.avatar,
        position: item.position,
        fullname: item.fullname,
        updatedAt: Date.now(),
    };
    return adminModel.editAdmin(idAdmin, dataAdmin);
};
let deleteAdmin = (idAdmin) => {
    return adminModel.deleteAdmin(idAdmin);
};
module.exports = {
    getAdmin: getAdmin,
    findAdminById: findAdminById,
    createAdmin: createAdmin,
    editAdmin: editAdmin,
    deleteAdmin: deleteAdmin,
};
