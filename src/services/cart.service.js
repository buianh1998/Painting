import checkoutModel from "./../models/checkout.model";
let createCart = (item) => {
    return new Promise(async (resolve, reject) => {
        let dataCart = await checkoutModel.createCart(item);
        resolve(dataCart);
    });
};
module.exports = {
    createCart: createCart,
};
