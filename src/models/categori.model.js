const mongosee = require("mongoose");

let categoriSchema = new mongosee.Schema({
    Title: { type: String, min: 12, max: 90, trim: true },
    DayAdded: { type: Date, default: Date.now }
});
categoriSchema.statics = {
    createItem(item) {
        return this.create(item);
    }
};
module.exports = mongosee.model("categori", categoriSchema);
