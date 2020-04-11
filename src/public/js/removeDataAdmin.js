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
function removeRequestDataAdmin() {
    $(".btn-delete-admin").bind("click", function () {
        let adminId = $(this).data("admin");
        Swal.fire({
            title: "Bạn có muốn xóa quản trị viên này khỏi danh sách không?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng Ý!",
            cancelButtonText: "Hủy Bỏ",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/admin/admin/delete-admin",
                    type: "delete",
                    data: { idAdmin: adminId },
                    success: function (data) {
                        if (data.success) {
                            Swal.fire("Xóa thành công!", "Bạn vừa xóa 1 quản trị viên.", "success");
                            $("#list-admin").find(`tr.data-admin[data-idadmin=${adminId}]`).remove();
                        }
                    },
                });
            }
        });
    });
}
removeRequestDataCate();
removeRequestDataProduct();
removeRequestDataAdmin();
