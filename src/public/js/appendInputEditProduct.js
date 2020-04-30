$(document).ready(function () {
    function countDataProductInput() {
        let item = $(".data-product-id-input").children().length - 1;
        return item;
    }
    function countProductEditInput() {
        let item = $(".append-data-input-after").children().length + 1;
        return item;
    }
    function sumInputOnEditProduct() {
        let sum = countDataProductInput() + countProductEditInput();
        return sum;
    }
    $("#btn-edit-size-and-price").bind("click", function () {
        let n = sumInputOnEditProduct() - 1;
        console.log(n);

        if (n > 9) {
            alertify.notify("Số lượng hàng tối đa là 9", "error", 7);
            return false;
        }
        $(".append-data-input-after").append(`
        <div class="form-row" >
            <div class="col-md-4 mb-3 input-size">
                <label for="validationCustom06">Kích Thước Bộ</label>
                <input
                    type="text"
                    class="form-control"
                    id="validationCustom06"
                    name="size${n}"
                    placeholder="Nhập kích thước"
                    required=""
                />
                <div class="invalid-feedback">
                    Kích thước bộ không được để trống
                </div>
            </div>
            <div class="col-md-4 mb-3 input-price">
                <label for="validationCustom02">Giá</label>
                <input
                    type="number"
                    class="form-control"
                    id="validationCustom02"
                    name="price${n}"
                    placeholder="Nhập giá sản phẩm"
                    required=""
                />
                <div class="invalid-feedback">
                    Giá sản phẩm không được trống
                </div>
            </div>
            <div class="col-md-3 mb-3 input-button" style="margin-top: 30px;">
                <button type="button" class="btn btn-danger btn-delete-size-and-price-product">Xóa Kích Thước Và Giá</button>
            </div>
        </div>
        `);
    });
    $(document).on("click", "button.btn-delete-size-and-price-product", function () {
        $(this).parent().parent().remove();
        let m = countDataProductInput();
        let n = sumInputOnEditProduct();
        for (let i = 0; i < n - 1; i++) {
            $("#data-edit-input div.form-row div.input-size:eq(" + i + ") input").attr("name", `size${i + m}`);
            $("#data-edit-input div.form-row div.input-price:eq(" + i + ") input").attr("name", `price${i + m}`);
        }
    });
});
