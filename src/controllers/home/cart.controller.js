import Cart from "./../../models/cart.model";
import { product, cart } from "./../../services/index.services";

let addToCart = async (req, res) => {
    try {
        let idproduct = req.params.id;
        let dataIdProduct = await product.findProductById(idproduct);
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        dataIdProduct.price = dataIdProduct.size[0].price;
        let dataCart = await cart.add(dataIdProduct, dataIdProduct._id);
        req.session.cart = cart;
        res.status(200).send(dataCart);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
let addOneItem = async (req, res) => {
    let idproduct = req.body.id;
    let price = +req.body.price;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let dataItemCart = await cart.addOneItem(idproduct, price);
    req.session.cart = cart;
    res.status(200).send(dataItemCart);
};
let addItemsToCart = async (req, res) => {
    try {
        let idproduct = req.params.id;
        let priceItem = +req.body.firstPrice;
        let numberQty = +req.body.numberQty;
        let dataIdProduct = await product.findProductById(idproduct);
        dataIdProduct.price = priceItem;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        let dataItemCart = await cart.addItems(dataIdProduct, idproduct, numberQty);
        req.session.cart = cart;
        res.status(200).send(dataItemCart);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
let shopppingCart = (req, res) => {
    if (!req.session.cart) {
        return res.render("client/blocks/content/content", { page: "cart/cart", product: null });
    }
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render("client/blocks/content/content", {
        page: "cart/cart",
        product: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty,
    });
};
let deleteItemOnCart = async (req, res) => {
    try {
        let idproduct = req.params.idproduct;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        let dataCart = await cart.deleteItem(idproduct);
        req.session.cart = cart;
        return res.status(200).send(dataCart);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
let deleteOneItem = async (req, res) => {
    let idproduct = req.body.id;
    let price = +req.body.price;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let dataItemCart = await cart.deleteOneItem(idproduct, price);
    req.session.cart = cart;
    res.status(200).send(dataItemCart);
};
let deleteAllCart = (req, res) => {
    req.session.cart = null;
    return res.redirect("/");
};
let changeDataInputCart = async (req, res) => {
    try {
        let idproduct = req.body.id;
        let price = +req.body.price;
        let countQty = +req.body.countQty;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        let dataItemCart = await cart.changeDataInputCart(idproduct, price, countQty);
        req.session.cart = cart;
        res.status(200).send(dataItemCart);
    } catch (error) {
        res.status(500).send(error);
    }
};
let getCheckout = (req, res) => {
    if (!req.session.cart) {
        return res.render("client/blocks/content/content", { page: "cart/cart", product: null });
    }
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    return res.render("client/blocks/content/content", {
        page: "checkout/checkout",
        product: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty,
    });
};
let postCheckout = async (req, res) => {
    try {
        if (!req.session.cart) {
            return res.render("client/blocks/content/content", { page: "cart/cart", product: null });
        }
        let cartSession = new Cart(req.session.cart ? req.session.cart : {});
        let cartContent = cartSession.generateArray();
        let arrCart = [];
        cartContent.forEach((item) => {
            let itemCart = {};
            itemCart.idproduct = item.item._id;
            itemCart.price = item.price;
            itemCart.qty = item.qty;
            arrCart.push(itemCart);
        });

        let { username, address, phoneNumber, email, note } = req.body;
        let item = {
            username,
            address,
            phoneNumber,
            email,
            note,
            product: arrCart,
            totalPrice: cartSession.totalPrice,
            totalQty: cartSession.totalQty,
        };
        let dataCart = await cart.createCart(item);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
let checkCart = (req, res, next) => {
    if (req.session.cart) {
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        res.locals.cartProduct = cart.generateArray();
        return next();
    }
    next();
};
module.exports = {
    addToCart: addToCart,
    addOneItem: addOneItem,
    addItemsToCart: addItemsToCart,
    shopppingCart: shopppingCart,
    deleteAllCart: deleteAllCart,
    deleteItemOnCart: deleteItemOnCart,
    deleteOneItem: deleteOneItem,
    changeDataInputCart: changeDataInputCart,
    getCheckout: getCheckout,
    postCheckout: postCheckout,
    checkCart: checkCart,
};
