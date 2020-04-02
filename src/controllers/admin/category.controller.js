import { category } from "./../../services/admin/index.services";

let dataCategory = (req, res) => {
    res.render("admin/admin", { page: "category/addCategory" });
};

module.exports = {
    dataCategory: dataCategory
};
