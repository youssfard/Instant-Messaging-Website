$(function () {
    const $form = $("#form");
    const $image_picker = $("#image");
    const $image = $("#avatar");
    let error_message = false;

    $image.on("click", () => {
        $image_picker.trigger("click");
    });

    $image_picker.on("change", () => {
        $image.attr("src", URL.createObjectURL($image_picker[0].files[0]));
    });

    $form.on("submit", (e) => {
        e.preventDefault();

        const name = $form[0].name.value;
        const email = $form[0].email.value;
        const user = $form[0].username.value;
        const password = $form[0].password.value;

        $.ajax({
            url: "../php/check_username.php",
            method: "GET",
            data: {
            username: user,
            email: email
            },
            success: function (data) {
                data = (data + "").trim();

                if (data == 1 &&password.length > 6 &&email.includes("@") &&name.length > 6 &&$image_picker[0].files.length > 0){
                    $.ajax({
                        url: "../php/register.php",
                        method: "POST",
                        data: new FormData($form[0]),
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            data = (data + "").trim();
                            if (data === "ok") {
                                window.location.href = "/web programming/php/dashboard.php";
                            }
                        }
                    });
                } else {
                    if (!error_message) {
                        $("<p>", { text: "The data entered is wrong!", class: "error" }).appendTo($form);
                        error_message = true;
                    }
                }
            }
        });
    });
});
