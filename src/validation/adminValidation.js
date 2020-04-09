import { check } from "express-validator";
import { transErrors, transProductErrors } from "./../../lang/vi.lang";
let cateValidate = [
    check("title", transErrors.title_cate_incorrect)
        .isLength({ min: 7 })
        .matches(
            /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
        ),
];
let productValidate = [
    check("title", transProductErrors.title_product_incorrect)
        .isLength({ min: 12, max: 90 })
        .matches(
            /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
        ),
    check("price", transProductErrors.price_product_incorrect).isLength({ min: 6, max: 7 }),
    check("description", transProductErrors.description_product_incorrect).isLength({ min: 10, max: 3000 }),
    check("amount", transProductErrors.amount_product_incorrect).isLength({ min: 1, max: 2 }),
];
module.exports = {
    cateValidate: cateValidate,
    productValidate: productValidate,
};
