$(function () {
    const $input = $("#search_friends");
    const $users = $("#results");

    $input.on("keyup", function () {
        const val = $input.val().trim();
        $users.empty();

        if (val !== "") {
            load_friends(val);
        }
    });

    function load_friends(username) {
        $.ajax({
            url: "../php/search.php",
            method: "GET",
            dataType: "json",
            data: { username: username },
            success: function (data) {
                data.forEach(function (u) {
                    const $li = $("<li>").addClass("friend_item");

                    const $img = $("<img>")
                        .addClass("friend_avatar")
                        .attr("src", u.image);

                    const $textWrap = $("<div>").addClass("friend_text");

                    const $nameDiv = $("<div>")
                        .addClass("friend_name")
                        .text(u.name);

                    const $usernameDiv = $("<div>")
                        .addClass("friend_username")
                        .text(u.username);

                    $textWrap.append($nameDiv, $usernameDiv);

                    const $addBtn = $("<button>")
                        .addClass("add_friend_btn")
                        .text("Add");

                    $addBtn.on("click", function () {
                        $(this).prop("disabled", true).text("Added!");

                        $.ajax({
                            url: "../php/send_request.php",
                            method: "POST",
                            data: { receiver_id: u.id }
                        });
                    });

                    $li.append($img, $textWrap, $addBtn);
                    $users.append($li);
                });
            }
        });
    }
});
