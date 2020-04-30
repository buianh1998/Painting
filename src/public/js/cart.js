function changeDataCart(id, qty, price, totalQty, totalPrice) {
    $(`#totalQty_${id}`).val(qty);
    $("#list-items-cart").find(`td#price-item-cart_${id}`).text(price);
    $("#total-price-and-qty-of-cart").find("span#total-qty").text(totalQty);
    $("#total-price-and-qty-of-cart").find("span#total-price").text(totalPrice);
}
function addOneItemToCart() {
    $(".add-one-item-on-cart")
        .unbind("click")
        .bind("click", function () {
            let idproduct = $(this).data("uid");
            let price = $(this).data("price");
            let countQty = $(`#totalQty_${idproduct}`).val();
            $.ajax({
                url: "add-one-item",
                type: "PUT",
                data: {
                    id: idproduct,
                    price: price,
                    countQty: countQty,
                },
                success: function (data) {
                    changeDataCart(idproduct, data.qty, data.price, data.totalQty, data.totalPrice);
                    $(".ps-cart__toggle").find("i#total-qty-cart-on-header").text(data.numItems);
                    $(".show-hide-cart").css("display", "block");

                    $(`.ps-cart-item__content_${idproduct}`).find("i#totel-qty-item").text(data.qty);
                    $(`.ps-cart-item__content_${idproduct}`).find("i#totel-price-item").text(data.price);

                    $("#list-cart-on-header").find("span#qty-total-on-header").text(data.totalQty);
                    $("#list-cart-on-header").find("span#price-total-on-header").text(data.totalPrice);
                },
            });
        });
}
function deleteOneItemToCart() {
    $(".delete-one-item-on-cart")
        .unbind("click")
        .bind("click", function () {
            let idproduct = $(this).data("uid");
            let price = $(this).data("price");
            let countQty = $(`#totalQty_${idproduct}`).val();
            if (countQty <= 1) {
                alertify.notify(
                    "Số lượng sản phẩm đặt không được nhỏ hơn 1, bạn có thể xóa sản phẩm đó khỏi giỏ hàng bắng nút X ở phía sau đó",
                    "error",
                    7
                );
                return false;
            }
            $.ajax({
                url: "delete-one-item",
                type: "PUT",
                data: {
                    id: idproduct,
                    price: price,
                    countQty: countQty,
                },
                success: function (data) {
                    console.log(data);
                    changeDataCart(idproduct, data.qty, data.price, data.totalQty, data.totalPrice);
                    $(".ps-cart__toggle").find("i#total-qty-cart-on-header").text(data.numItems);
                    $(".show-hide-cart").css("display", "block");

                    $(`.ps-cart-item__content_${idproduct}`).find("i#totel-qty-item").text(data.qty);
                    $(`.ps-cart-item__content_${idproduct}`).find("i#totel-price-item").text(data.price);

                    $("#list-cart-on-header").find("span#qty-total-on-header").text(data.totalQty);
                    $("#list-cart-on-header").find("span#price-total-on-header").text(data.totalPrice);
                },
            });
        });
}
function totalQtyOld(idproduct) {
    let totalQtyOld = $(`#totalQty_${idproduct}`).val();
    return totalQtyOld;
}

function changeIuputNumberData() {
    $(".val-input")
        .unbind("change")
        .bind("change", function () {
            let idproduct = $(this).parent().data("uid");
            let countQty = $(this).val();
            let price = $(this).data("price");
            if (countQty < 1) {
                alertify.notify(
                    "Số lượng sản phẩm đặt không được nhỏ hơn 1, bạn có thể xóa sản phẩm đó khỏi giỏ hàng bắng nút X ở phía sau đó",
                    "error",
                    7
                );
                $(`#totalQty_${idproduct}`).val();
                return false;
            }
            if (countQty > 30) {
                alertify.notify(
                    "Số lượng sản phẩm đặt không được nhiều hơn 10, bạn có thể xóa sản phẩm đó khỏi giỏ hàng bắng nút X ở phía sau đó",
                    "error",
                    7
                );
                $(`#totalQty_${idproduct}`).val();
                return false;
            }

            // if (countQty != Number) {
            //     alertify.notify("Số lượng sản phẩm đặt phải là số, đề nghị bạn nhập lại", "error", 7);
            //     return false;
            // }
            $.ajax({
                url: "change-data-input-cart",
                type: "put",
                data: {
                    id: idproduct,
                    price: price,
                    countQty: countQty,
                },
                success: function (data) {
                    changeDataCart(idproduct, data.qty, data.price, data.totalQty, data.totalPrice);
                    console.log(data);
                    $(".ps-cart__toggle").find("i#total-qty-cart-on-header").text(data.numItems);
                    $(".show-hide-cart").css("display", "block");

                    $(`.ps-cart-item__content_${idproduct}`).find("i#totel-qty-item").text(data.qty);
                    $(`.ps-cart-item__content_${idproduct}`).find("i#totel-price-item").text(data.price);

                    $("#list-cart-on-header").find("span#qty-total-on-header").text(data.totalQty);
                    $("#list-cart-on-header").find("span#price-total-on-header").text(data.totalPrice);
                },
            });
        });
}
function addItemOnViewToCart() {
    $(".add-one-item-to-cart")
        .unbind("click")
        .bind("click", function () {
            let idproduct = $(this).data("uid");
            axios({
                method: "GET",
                url: `/add-to-cart/${idproduct}`,
                // data: { id: idproduct },
            }).then(function (response) {
                $(".ps-cart__toggle").find("i#total-qty-cart-on-header").text(response.data.numItems);
                $(".show-hide-cart").css("display", "block");
                if (response.data.numItems <= 3) {
                    if (response.data.qty == 1) {
                        $(".ps-cart__listing").find("div#list-cart-product-on-heder").append(
                            `
                            <div class="ps-cart-item">
                                <a class="ps-cart-item__close" href="/delete-item-cart/${idproduct}"></a>
                                <div class="ps-cart-item__thumbnail">
                                    <a href="javascript:void(0)"></a><img src="uploads/imageproduct/${response.data.image}" alt="" />
                                </div>
                                <div class="ps-cart-item__content_${idproduct}">
                                    <a class="ps-cart-item__title" href="javascript:void(0)">${response.data.title}</a>
                                    <p>
                                    <span>Số lượng:<i id="totel-qty-item">${response.data.qty}</i></span>
                                    <br /><span>Tổng tiền:<i id="totel-price-item">${response.data.price}đ</i></span>
                                    </p>
                                </div>
                            </div>
                        `
                        );
                    } else {
                        $(`.ps-cart-item__content_${idproduct}`).find("i#totel-qty-item").text(response.data.qty);
                        $(`.ps-cart-item__content_${idproduct}`).find("i#totel-price-item").text(response.data.price);
                    }
                } else {
                    $(".numItems-bigger-three").css("display", "block");
                    $(".numItems-bigger-threes").css("display", "none");
                }
                $("#list-cart-on-header").find("span#qty-total-on-header").text(response.data.totalQty);
                $("#list-cart-on-header").find("span#price-total-on-header").text(response.data.totalPrice);
            });
        });
}
function addItemsOnDetailToCart() {
    $(".add-one-items-to-cart")
        .unbind("click")
        .bind("click", function () {
            let idproduct = $(this).data("uid");
            let firstPrice = $("#firstPrice").val();
            let numberQty = $("#data-number-qty-product").val();
            axios({
                method: "POST",
                url: `/add-items-cart/${idproduct}`,
                data: { firstPrice: firstPrice, numberQty: numberQty },
            }).then(function (response) {
                $(".ps-cart__toggle").find("i#total-qty-cart-on-header").text(response.data.numItems);
                $(".show-hide-cart").css("display", "block");
                if (response.data.numItems <= 3) {
                    if (response.data.qty <= 10) {
                        $(".ps-cart__listing").find("div#list-cart-product-on-heder").append(
                            `
                            <div class="ps-cart-item">
                                <a class="ps-cart-item__close" href="/delete-item-cart/${idproduct}"></a>
                                <div class="ps-cart-item__thumbnail">
                                    <a href="javascript:void(0)"></a><img src="uploads/imageproduct/${response.data.image}" alt="" />
                                </div>
                                <div class="ps-cart-item__content_${idproduct}">
                                    <a class="ps-cart-item__title" href="javascript:void(0)">${response.data.title}</a>
                                    <p>
                                    <span>Số lượng:<i id="totel-qty-item">${response.data.qty}</i></span>
                                    <br /><span>Tổng tiền:<i id="totel-price-item">${response.data.price}đ</i></span>
                                    </p>
                                </div>
                            </div>
                        `
                        );
                    } else {
                        $(`.ps-cart-item__content_${idproduct}`).find("i#totel-qty-item").text(response.data.qty);
                        $(`.ps-cart-item__content_${idproduct}`).find("i#totel-price-item").text(response.data.price);
                    }
                } else {
                    $(".numItems-bigger-three").css("display", "block");
                    $(".numItems-bigger-threes").css("display", "none");
                }
                $("#list-cart-on-header").find("span#qty-total-on-header").text(response.data.totalQty);
                $("#list-cart-on-header").find("span#price-total-on-header").text(response.data.totalPrice);
            });
        });
}
function deleteItemToCart() {
    $(".delete-item-to-cart")
        .unbind("click")
        .bind("click", function () {
            let idproduct = $(this).data("uid");
            Swal.fire({
                title: "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng Ý!",
                cancelButtonText: "Hủy Bỏ",
                with: 100,
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: "GET",
                        url: `/delete-item-cart/${idproduct}`,
                    })
                        .then(function (response) {
                            $(".ps-cart__toggle").find("i#total-qty-cart-on-header").text(response.data.numItems);
                            $(`#data-item-cart-${idproduct}`).remove();
                            $("#total-price-and-qty-of-cart").find("span#total-qty").text(response.data.totalQty);
                            $("#total-price-and-qty-of-cart").find("span#total-price").text(response.data.totalPrice);
                            $(`.ps-cart-item__content_${idproduct}`).parent().remove();
                            $("#list-cart-on-header").find("span#qty-total-on-header").text(response.data.totalQty);
                            $("#list-cart-on-header").find("span#price-total-on-header").text(response.data.totalPrice);
                            Swal.fire("Xóa thành công!");
                        })
                        .catch(function (error) {
                            console.log(error);
                            alertify.notify(
                                "Lỗi từ phía server, bạn hãy nhắn tin cho cửa hàng hoặc để lại lời nhắn ở phần góp ý cuối trang chủ",
                                "error",
                                7
                            );
                        });
                }
            });
        });
}
