import { admin } from "./../../services/index.services";
import multer from "multer";
import { uploadFile } from "./../../config/configUploadImage";
import { tranAdminErros, transSuccess } from "./../../../lang/vi.lang";
import fsExtra from "fs-extra";
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
let checkPowerAdmin = async (req, res, next) => {
    let checkPowerAdmin = await admin.findAdminById(req.user._id);
    if (checkPowerAdmin.position == 2) {
        return res.redirect("/admin");
    }
    next();
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
                return res.redirect(`/admin/admin/edit-admin/${idAdmin}`);
            }
            errArr.push(errUpload);
            req.flash("errors", errArr);
            return res.redirect(`/admin/admin/edit-admin/${idAdmin}`);
        }
        let dataIdAdmin = await admin.findAdminById(idAdmin);
        let avatarUpdate = req.body.avatarOld;
        if (typeof req.file !== "undefined") {
            avatarUpdate = req.file.filename;
            await fsExtra.remove(`${uploadFile.avatar_directory}/${dataIdAdmin.avatar}`);
        }
        let { password, position, fullname } = req.body;
        let item = {
            password,
            position,
            fullname,
            avatar: avatarUpdate,
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
let findIdAdminById = async (req, res) => {
    let { idAdmin } = req.params;
    let dataIdAdmin = await admin.findAdminById(idAdmin);
    return res.render("admin/blocks/content/content", {
        page: "admin/editIdAdmin",
        dataIdAdmin: dataIdAdmin,
        errors: req.flash("errors"),
    });
};
let editIdAdmin = async (req, res) => {
    let errArr = [];
    let { idAdmin } = req.params;
    upload(req, res, async (errUpload) => {
        if (errUpload) {
            if (errUpload.message) {
                errArr.push(tranAdminErros.iamge_admin_limit);
                req.flash("errors", errArr);
                return res.redirect(`/admin/edit-id-admin/${idAdmin}`);
            }
            errArr.push(errUpload);
            req.flash("errors", errArr);
            return res.redirect(`/admin/edit-id-admin/${idAdmin}`);
        }
        let dataIdAdmin = await admin.findAdminById(idAdmin);
        let avatarUpdate = req.body.avatarOld;
        if (typeof req.file !== "undefined") {
            avatarUpdate = req.file.filename;
            await fsExtra.remove(`${uploadFile.avatar_directory}/${dataIdAdmin.avatar}`);
        }
        let { password, position, fullname } = req.body;
        let item = {
            password,
            position,
            fullname,
            avatar: avatarUpdate,
        };
        try {
            await admin.editAdmin(idAdmin, item);
            return res.redirect("/admin");
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
        await fsExtra.remove(`${uploadFile.avatar_directory}/${dataAdminDL.avatar}`);

        return res.status(200).send({ success: !!dataAdminDL });
    } catch (error) {
        return res.status(500).send(error);
    }
};
module.exports = {
    layoutAdmin: layoutAdmin,
    getAdmin: getAdmin,
    findAdminById: findAdminById,
    findIdAdminById: findIdAdminById,
    createAdmin: createAdmin,
    editAdmin: editAdmin,
    editIdAdmin: editIdAdmin,
    deleteAdmin: deleteAdmin,
    checkPowerAdmin: checkPowerAdmin,
};
