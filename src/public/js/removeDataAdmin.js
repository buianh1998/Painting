function removeRequestDataCate() {
    $(".btn-delete-cate").bind("click", function () {
        let cateId = $(this).data("idcate");
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa loại sản phẩm này không?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng Ý",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/admin/category/remove-cate",
                    type: "delete",
                    data: { idcate: cateId },
                    success: function (data) {
                        if (data.success) {
                            $("#list-category").find(`tr.data-category[data-idcate=${cateId}]`).hide();
                        }
                    },
                });
            }
        });
    });
}
function removeRequestDataProduct() {
    $(".btn-delete-product").bind("click", function () {
        let productId = $(this).data("idproduct");
        Swal.fire({
            title: "Bạn có muốn xóa sản phẩm này khỏi danh sách không?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý!",
            cancelButtonText: "Hủy Bỏ!",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/admin/product/remove-product",
                    type: "delete",
                    data: { idProduct: productId },
                    success: function (data) {
                        if (data.success) {
                            $("#list-product").find(`tr.data-product[data-idproduct=${productId}]`).hide();
                        }
                    },
                });
            }
        });
    });
}
removeRequestDataCate();
removeRequestDataProduct();
