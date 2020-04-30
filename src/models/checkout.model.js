import mongoose from "mongoose";
let checkoutSchema = new mongoose.Schema({
    username: String,
    address: String,
    phoneNumber: String,
    email: String,
    note: String,
    product: [{ idproduct: String, price: Number, qty: Number }],
    totalPrice: Number,
    totalQty: Number,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
});
checkoutSchema.statics = {
    createCart(item) {
        return this.create(item);
    },
};
module.exports = mongoose.model("checkout", checkoutSchema);
