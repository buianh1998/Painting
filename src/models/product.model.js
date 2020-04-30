const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: { type: String, min: 12, max: 90, trim: true },
    size: [{ price: Number, size: String }],
    description: { type: String, min: 10, max: 3000, trim: true },
    amount: { type: Number, trim: true },
    image: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    idCate: { type: mongoose.Schema.Types.ObjectId, ref: "categori" },
});
productSchema.statics = {
    getProduct(start, limit) {
        return this.find().skip(start).limit(limit).sort({ createdAt: -1 }).exec();
    },
    getNewProductLimited() {
        return this.find().sort({ createdAt: -1 }).limit(8).exec();
    },
    getProductOnCate(item) {
        return this.find({ idCate: item }).sort({ createdAt: -1 }).exec();
    },
    findByTitle(item) {
        return this.findOne({ title: item }).exec();
    },
    countDataProduct() {
        return this.countDocuments().exec();
    },
    /**
     *create
     * @param {object} item
     */
    createProduct(item) {
        return this.create(item);
    },
    findProductById(item) {
        return this.findById(item).exec();
    },
    findProductByTitle(item) {
        return this.findOne({ title: item }).exec();
    },
    updateProduct(idProduct, item) {
        return this.findByIdAndUpdate(idProduct, item).exec();
    },
    removeProduct(item) {
        return this.findByIdAndDelete(item).exec();
    },
    searchDataProduct(item) {
        return this.find({
            $or: [{ title: { $regex: new RegExp(item, "i") } }, { description: { $regex: new RegExp(item, "i") } }],
        }).exec();
    },
};
productSchema.pre(/^find/, function (next) {
    this.populate({ path: "idCate", select: "-_v" });
    next();
});
module.exports = mongoose.model("products", productSchema);
