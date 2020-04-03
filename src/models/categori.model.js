const mongosee = require("mongoose");

let categoriSchema = new mongosee.Schema({
    title: { type: String, min: 12, max: 90, trim: true },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
});
categoriSchema.statics = {
    /**
     * find data Category
     */
    findCate() {
        return this.find().sort({ createdAt: -1 }).exec();
    },
    /**
     * find by id Cate
     * @param {string} idCate
     */
    findIdCate(idCate) {
        return this.findById({ _id: idCate });
    },
    /**
     * create category item
     * @param {Object} item
     */
    createCate(item) {
        return this.create(item);
    },
    /**
     * update category item
     * @param {string} idCate
     * @param {Object} item
     */
    updateCate(idCate, item) {
        return this.findByIdAndUpdate(idCate, item);
    },
};
module.exports = mongosee.model("categori", categoriSchema);
