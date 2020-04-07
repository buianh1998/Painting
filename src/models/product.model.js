const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: { type: String, min: 12, max: 90, trim: true },
    price: { type: Number, min: 1000, max: 9000000, trim: true },
    description: { type: String, min: 10, max: 3000, trim: true },
    amount: { type: Number, min: 1, max: 100, trim: true },
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
};
productSchema.pre(/^find/, function (next) {
    this.populate({ path: "idCate", select: "-_v" });
    next();
});
module.exports = mongoose.model("product", productSchema);
