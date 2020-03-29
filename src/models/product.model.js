const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    Title: { type: String, min: 12, max: 90, trim: true },
    Price: { type: Number, min: 1000, max: 9000000, trim: true },
    Description: { type: String, min: 10, max: 3000, trim: true },
    Amount: { type: Number, min: 1, max: 200, trim: true },
    Image: String,
    DayAdded: { type: Number, default: Date.now },
    idCate: { type: mongoose.Schema.Types.ObjectId, ref: "categori" }
});
productSchema.pre(/^find/, function(next) {
    this.populate({ path: "idCate", select: "-_v" });
    next();
});
module.exports = mongoose.model("product", productSchema);
