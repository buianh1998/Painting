const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: "" },
    password: String,
    fullname: String,
    avatar: String,
    position: Number,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
});
adminSchema.statics = {
    getAdmin() {
        return this.find().sort({ createAt: -1 }).exec();
    },
    findAdminById(idAdmin) {
        return this.findById(idAdmin);
    },

    findAdminByEmail(item) {
        return this.findOne({ username: item });
    },
    createAdmin(item) {
        return this.create(item);
    },
    editAdmin(idAdmin, item) {
        return this.findByIdAndUpdate(idAdmin, item);
    },
    deleteAdmin(idAdmin) {
        return this.findByIdAndDelete(idAdmin);
    },
};
module.exports = mongoose.model("admin", adminSchema);
