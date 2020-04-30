import categorySevice from "./category.service";
import productSevice from "./product.service";
import adminService from "./admin.service";
import cartSevice from "./cart.service";
module.exports = {
    category: categorySevice,
    product: productSevice,
    admin: adminService,
    cart: cartSevice,
};
