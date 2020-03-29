const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    avatar: { type: String, default: "avatar-default.jpg" },
    createAt: { type: Number, default: Date.now },
    updateAt: { type: Number, default: null }
});
module.exports = mongoose.model("admin", adminSchema);
