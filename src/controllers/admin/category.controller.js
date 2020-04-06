import { category } from "./../../services/admin/index.services";
import { validationResult } from "express-validator";
import { transErrors, transSuccess } from "./../../../lang/vi.lang";
let findCate = async (req, res) => {
    try {
        let datacate = await category.findCate({ title: "Tranh Bộ Ba" });
        res.render("admin/blocks/content/content", {
            page: "category/addCategory",
            datacate: datacate,
            errors: req.flash("errors"),
            success: req.flash("success"),
        });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
};
let findIdCate = async (req, res) => {
    try {
        let idCate = req.params.idcate;
        let dataIdCate = await category.findIdCate(idCate);
        res.render("admin/blocks/content/content", {
            page: "category/editCategory",
            cateId: dataIdCate,
            errors: req.flash("errors"),
        });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
};
let createCate = async (req, res) => {
    let errArr = [];
    let success = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        // Object.values() lấy tất cả các value của Object bạn đầu và nhóm lại thành 1 cái mảng
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errArr.push(item.msg);
        });
        req.flash("errors", errArr);
        return res.redirect("/admin/category");
    }
    try {
        let item = { title: req.body.title };
        await category.createCate(item);
        success.push(transSuccess.new_cate_success);
        req.flash("success", success);
        res.redirect("/admin/category");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.redirect("/admin/category");
    }
};
let updateCate = async (req, res) => {
    let errArr = [];
    let success = [];
    let idCate = req.params.idcate;
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        // Object.values() lấy tất cả các value của Object bạn đầu và nhóm lại thành 1 cái mảng
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errArr.push(item.msg);
        });
        req.flash("errors", errArr);
        return res.redirect(`/admin/category/edit-cate/${idCate}`);
    }
    try {
        let idCate = req.params.idcate;
        let item = {
            title: req.body.title,
            updatedAt: Date.now(),
        };
        await category.updateCate(idCate, item);
        success.push(transSuccess.update_cate_success);
        req.flash("success", success);
        res.redirect("/admin/category");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.redirect(`/admin/category/edit-cate/${idCate}`);
    }
};
let removeCate = async (req, res) => {
    try {
        let idCate = req.body.idcate;
        console.log(idCate);

        let removeCate = await category.removeCate(idCate);
        res.status(200).send({ success: !!removeCate });
    } catch (error) {
        res.status(500).send(error);
    }
};
module.exports = {
    findCate: findCate,
    findIdCate: findIdCate,
    createCate: createCate,
    updateCate: updateCate,
    removeCate: removeCate,
};
