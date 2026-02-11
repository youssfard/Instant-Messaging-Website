$(function () {
    const $input = $("#search_bar");
    const $results = $("#results");

    function send_request(receiver_id) {
        const formData = new FormData();
        formData.append("receiver_id", receiver_id);

        $.ajax({
            url: "../php/send_request.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false
        });
    }

    $input.on("keyup", function () {
        const val = $input.val();
        $results.empty();

        if (val === "") {
            return;
        }

        $.ajax({
            url: "../php/search.php",
            method: "GET",
            dataType: "json",
            data: { p: val },
            success: function (data) {
                data.forEach(function (user) {
                    const $li = $("<li>").text(user.username);

                    $li.on("click", function () {
                        send_request(user.id);
                        $results.empty();
                        $input.val("");
                    });

                    $results.append($li);
                });
            }
        });
    });
});
