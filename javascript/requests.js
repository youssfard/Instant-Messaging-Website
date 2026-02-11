$(function () {
    const $results = $("#results");
    const $page = $("#page");
    const $no_reqs = $("#no_requests");

    function accept_req(clicked_id) {
        const formData = new FormData();
        formData.append("user2_id", clicked_id);

        $.ajax({
            url: "../php/accept_request.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            complete: function () {
                load_requests();
            }
        });
    }

    function reject_req(clicked_id) {
        const formData = new FormData();
        formData.append("clicked_id", clicked_id);

        $.ajax({
            url: "../php/delete_request.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            complete: function () {
                load_requests();
            }
        });
    }

    function load_requests() {
    	console.log("test");
        $results.empty();
        $no_reqs.hide();

        $.ajax({
            url: "../php/requests.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.length) {
                    $no_reqs.css("display", "block");
                    return;
                }

                data.forEach(function (r) {
                    const $li = $("<li>").addClass("request_item");

                    const $img = $("<img>")
                        .addClass("avatar")
                        .attr("src", r.image);

                    const $textWrap = $("<div>").addClass("request_text");

                    const $name = $("<div>")
                        .addClass("name")
                        .text(r.sender_name);

                    const $username = $("<div>")
                        .addClass("username")
                        .text(r.sender_username);

                    $textWrap.append($name, $username);

                    const $contentWrap = $("<div>").addClass("request_content");
                    $contentWrap.append($img, $textWrap);

                    const $buttonWrap = $("<div>").addClass("request_buttons");

                    const $acceptBtn = $("<button>")
                        .addClass("accept_btn")
                        .text("ACCEPT")
                        .on("click", function () {
                            accept_req(r.sender_id);
                        });

                    const $rejectBtn = $("<button>")
                        .addClass("reject_btn")
                        .text("REJECT")
                        .on("click", function () {
                            reject_req(r.sender_id);
                        });

                    $buttonWrap.append($acceptBtn, $rejectBtn);
                    $li.append($contentWrap, $buttonWrap);
                    $results.append($li);
                });
            }
        });
    }

    load_requests();
});
