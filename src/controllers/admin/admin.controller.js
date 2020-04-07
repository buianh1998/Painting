let layoutAdmin = (req, res) => {
    res.render("admin/blocks/content/content", { page: "admin/layoutAdmin" });
};
module.exports = {
    layoutAdmin: layoutAdmin,
};
