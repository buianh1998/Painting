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
removeRequestDataCate();
