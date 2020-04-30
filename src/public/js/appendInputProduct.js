$(document).ready(function () {
    function countItemInput() {
        let items = $("#data-input").children().length;
        return items;
    }
    $("#btn-add-size-and-price").bind("click", function () {
        let n = countItemInput() - 2;
        console.log(n);

        if (n > 7) {
            alertify.notify("Số lượng hàng tối đa là 7", "error", 7);
            return false;
        } else {
            $(".add-input-for-product").append(`
            <div class="form-row">
                <div class="col-md-4 mb-3 input-size">
                    <label for="validationCustom06">Kích Thước Bộ</label>
                    <input
                        type="number"
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
                    <button type="button" class="btn btn-primary btn-delete-size-and-price">Xóa 1 Hàng</button>
                </div>
            <div>
            `);
        }
    });
    $(document).on("click", "button.btn-delete-size-and-price", function () {
        let n = countItemInput() - 3;
        $(this).parent().parent().remove();
        for (let i = 0; i < n; i++) {
            $("#data-input div.form-row div.input-price:eq(" + i + ") input").attr("name", `price${i + 1}`);
            $("#data-input div.form-row div.input-size:eq(" + i + ") input").attr("name", `size${i + 1}`);
        }
    });
});
