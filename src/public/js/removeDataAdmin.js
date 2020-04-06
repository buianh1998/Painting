function removeRequestDataCate() {
    $(".btn-delete-cate").bind("click", function () {
        let cateId = $(this).data("idcate");
        $.ajax({
            url: "/admin/category/remove-cate",
            type: "delete",
            data: { idcate: cateId },
            success: function (data) {
                if (data.success) {
                    console.log(data.success);

                    $("#list-category").find(`tr.data-category[data-idcate=${cateId}]`).hide();
                }
            },
        });
    });
}
removeRequestDataCate();
