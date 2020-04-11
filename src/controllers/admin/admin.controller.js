import { admin } from "./../../services/admin/index.services";
import multer from "multer";
import { uploadFile } from "./../../config/configUploadImage";
import { tranAdminErros, transSuccess } from "./../../../lang/vi.lang";
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFile.avatar_directory);
    },
    filename: function (req, file, cb) {
        let typeAdmin = uploadFile.image_type;
        if (typeAdmin.indexOf(file.mimetype) === -1) {
            return cb(tranAdminErros.image_admin_incorrect, null);
        }
        let avatarName = `${Date.now()}-${file.originalname}`;
        cb(null, avatarName);
    },
});
let upload = multer({ storage: storage, limits: uploadFile.image_limit }).single("avatar");
let layoutAdmin = (req, res) => {
    res.render("admin/blocks/content/content", { page: "admin/layoutAdmin" });
};
let getAdmin = async (req, res) => {
    let dataAdmin = await admin.getAdmin();
    res.render("admin/blocks/content/content", {
        page: "admin/addAdmin",
        dataAdmin: dataAdmin,
        errors: req.flash("errors"),
        success: req.flash("success"),
    });
};
let createAdmin = (req, res) => {
    let errArr = [];
    let success = [];
    upload(req, res, async (errUpload) => {
        if (errUpload) {
            if (errUpload.message) {
                errArr.push(tranAdminErros.iamge_admin_limit);
                req.flash("errors", errArr);
                return res.redirect("/admin/admin");
            }
            errArr.push(errUpload);
            req.flash("errors", errArr);
            return res.redirect("/admin/admin");
        }
        let { username, password, position } = req.body;
        let item = {
            username,
            password,
            position,
            avatar: req.file.filename,
        };
        try {
            await admin.createAdmin(item);
            success.push(transSuccess.new_admin_success);
            req.flash("success", success);
            res.redirect("/admin/admin");
        } catch (error) {
            errArr.push(error);
            req.flash("errors", errArr);
            res.redirect("/admin/admin");
        }
    });
};
let findAdminById = async (req, res) => {
    let { idAdmin } = req.params;
    let dataIdAdmin = await admin.findAdminById(idAdmin);
    return res.render("admin/blocks/content/content", {
        page: "admin/editAdmin",
        dataIdAdmin: dataIdAdmin,
        errors: req.flash("errors"),
    });
};
let editAdmin = (req, res) => {
    let errArr = [];
    let success = [];
    let { idAdmin } = req.params;
    upload(req, res, async (errUpload) => {
        if (errUpload) {
            if (errUpload.message) {
                errArr.push(tranAdminErros.iamge_admin_limit);
                req.flash("errors", errArr);
                return res.redirect(`/admin/edit-admin/${idAdmin}`);
            }
            errArr.push(errUpload);
            req.flash("errors", errArr);
            return res.redirect(`/admin/edit-admin/${idAdmin}`);
        }
        let { password, position, fullname } = req.body;
        let item = {
            password,
            position,
            fullname,
            avatar: typeof req.file !== "undefined" ? req.file.filename : req.body.avatarOld,
        };
        try {
            await admin.editAdmin(idAdmin, item);
            success.push(transSuccess.update_admin_success);
            req.flash("success", success);
            return res.redirect("/admin/admin");
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    });
};
let deleteAdmin = async (req, res) => {
    try {
        let idAdmin = req.body.idAdmin;
        let dataAdminDL = await admin.deleteAdmin(idAdmin);
        return res.status(200).send({ success: !!dataAdminDL });
    } catch (error) {
        return res.status(500).send(error);
    }
};
module.exports = {
    layoutAdmin: layoutAdmin,
    getAdmin: getAdmin,
    findAdminById: findAdminById,
    createAdmin: createAdmin,
    editAdmin: editAdmin,
    deleteAdmin: deleteAdmin,
};
