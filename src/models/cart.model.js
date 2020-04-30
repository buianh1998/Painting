module.exports = function Carts(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.numItems = oldCart.numItems || 0;
    this.add = function (item, id) {
        return new Promise((resolve, reject) => {
            let storedItem = this.items[id];
            if (!storedItem) {
                storedItem = this.items[id] = { item: item, price: 0, qty: 0, image: "", title: "" };
                this.numItems++;
            }
            storedItem.image = item.image;
            storedItem.title = item.title;
            storedItem.qty++;
            storedItem.price = item.price * storedItem.qty;
            this.totalQty++;
            this.totalPrice += item.price;
            let data = {
                image: storedItem.image,
                title: storedItem.title,
                qty: this.items[id].qty,
                price: this.items[id].price,
                totalPrice: this.totalPrice,
                totalQty: this.totalQty,
                numItems: this.numItems,
            };
            resolve(data);
        });
    };
    this.addItems = function (item, id, numberQty) {
        let storedItem = this.items[id];
        return new Promise((resolve, reject) => {
            if (!storedItem) {
                storedItem = this.items[id] = { item: item, price: 0, qty: 0 };
                this.numItems++;
            }
            storedItem.image = item.image;
            storedItem.title = item.title;
            storedItem.qty += numberQty;
            storedItem.price = item.price * storedItem.qty;
            this.totalQty += numberQty;
            this.totalPrice += item.price * numberQty;
            let data = {
                image: storedItem.image,
                title: storedItem.title,
                qty: this.items[id].qty,
                price: this.items[id].price,
                totalPrice: this.totalPrice,
                totalQty: this.totalQty,
                numItems: this.numItems,
            };
            resolve(data);
        });
    };
    this.deleteOneItem = function (id, itemPrice) {
        return new Promise((resolve, reject) => {
            try {
                this.items[id].qty--;
                this.items[id].price -= itemPrice;
                this.totalQty--;
                this.totalPrice -= itemPrice;
                if (this.items[id].qty <= 0) {
                    delete this.items[id];
                }
                let data = {
                    image: this.items[id].item.image,
                    title: this.items[id].item.title,
                    qty: this.items[id].qty,
                    price: this.items[id].price,
                    totalPrice: this.totalPrice,
                    totalQty: this.totalQty,
                    numItems: this.numItems,
                };
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };
    this.addOneItem = function (id, itemPrice) {
        return new Promise((resolve, reject) => {
            try {
                this.items[id].qty++;
                this.items[id].price += itemPrice;
                this.totalQty++;
                this.totalPrice += itemPrice;
                let data = {
                    image: this.items[id].item.image,
                    title: this.items[id].item.title,
                    qty: this.items[id].qty,
                    price: this.items[id].price,
                    totalPrice: this.totalPrice,
                    totalQty: this.totalQty,
                    numItems: this.numItems,
                };
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };
    this.deleteItem = function (id) {
        return new Promise((resolve, reject) => {
            try {
                this.totalQty -= this.items[id].qty;
                this.totalPrice -= this.items[id].price;
                this.numItems--;
                let data = {
                    totalPrice: this.totalPrice,
                    totalQty: this.totalQty,
                    numItems: this.numItems,
                };
                delete this.items[id];
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };
    this.changeDataInputCart = function (id, itemPrice, countQty) {
        return new Promise((resolve, reject) => {
            try {
                let qtyBefore = countQty;
                let qtyAppter = this.items[id].qty;
                this.items[id].qty = countQty ? Number(countQty) : 1;
                this.items[id].price = itemPrice * countQty;
                this.totalQty = this.totalQty + qtyBefore - qtyAppter;
                this.totalPrice += this.items[id].price - itemPrice * qtyAppter;
                let data = {
                    image: this.items[id].item.image,
                    title: this.items[id].item.title,
                    qty: this.items[id].qty,
                    price: this.items[id].price,
                    totalPrice: this.totalPrice,
                    totalQty: this.totalQty,
                    numItems: this.numItems,
                };
                resolve(data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    };
    this.generateArray = function () {
        let arr = [];
        for (let item in this.items) {
            arr.push(this.items[item]);
        }
        return arr;
    };
};
