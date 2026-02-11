$(function () {
    const $form = $("#form");
    let error_message = false;

    $("#logout_btn").on("click", function () {
        window.location.href = "../php/logout.php";
    });

    $form.on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            url: "../php/update_profile.php",
            method: "POST",
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: (data) => {
                if (data === "ok" && this.name.value.length > 4) {
                    window.location.href = "../php/dashboard.php";
                } else {
                    if (!error_message) {
                        $("<p>", {text: "Data entered is incorrect",class: "error"}).appendTo($form);
                        error_message = true;
                    }
                }
            }
        });
    });
});
