import { category } from "./../../services/admin/index.services";

let findCate = async (req, res) => {
    try {
        let count = 0;
        let datacate = await category.findCate({ title: "Tranh Bộ Ba" });
        res.render("admin/blocks/content/content", { page: "category/addCategory", datacate: datacate, count: count });
    } catch (error) {
        res.status(500).send(error);
    }
};
let findIdCate = async (req, res) => {
    try {
        let idCate = req.params.idcate;
        let dataIdCate = await category.findIdCate(idCate);
        res.render("admin/blocks/content/content", { page: "category/editCategory", cateId: dataIdCate });
    } catch (error) {
        res.status(500).send(error);
    }
};
let createCate = async (req, res) => {
    try {
        let item = { title: req.body.title };
        await category.createCate(item);
        res.redirect("/admin/category");
    } catch (error) {
        res.status(500).send(error);
    }
};
let updateCate = async (req, res) => {
    try {
        let idCate = req.params.idcate;
        let item = {
            title: req.body.title,
            updatedAt: Date.now(),
        };
        await category.updateCate(idCate, item);
        res.redirect("/admin/category");
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
};
let removeCate = async (req, res) => {
    try {
        let idCate = req.params.idcate;
        await category.removeCate(idCate);
        res.redirect("/admin/category");
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
