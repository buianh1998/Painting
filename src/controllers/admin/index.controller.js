import category from "./category.controller";
let layoutAdmin = (req, res) => {
    res.render("admin/admin", { page: "admin/layoutAdmin" });
};

module.exports = {
    layoutAdmin: layoutAdmin,
    category: category
};
