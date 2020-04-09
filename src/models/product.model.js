const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: { type: String, min: 12, max: 90, trim: true },
    price: { type: Number, trim: true },
    description: { type: String, min: 10, max: 3000, trim: true },
    amount: { type: Number, trim: true },
    image: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    idCate: { type: mongoose.Schema.Types.ObjectId, ref: "categori" },
});
productSchema.statics = {
    getProduct() {
        return this.find().sort({ createdAt: -1 }).exec();
    },
    findByTitle(item) {
        return this.findOne({ title: item });
    },
    /**
     *create
     * @param {object} item
     */
    createProduct(item) {
        return this.create(item);
    },
    findProductById(item) {
        return this.findById(item);
    },
    findProductByTitle(item) {
        return this.findOne({ title: item });
    },
    updateProduct(idProduct, item) {
        return this.findByIdAndUpdate(idProduct, item);
    },
    removeProduct(item) {
        return this.findByIdAndDelete(item);
    },
};
productSchema.pre(/^find/, function (next) {
    this.populate({ path: "idCate", select: "-_v" });
    next();
});
module.exports = mongoose.model("product", productSchema);
