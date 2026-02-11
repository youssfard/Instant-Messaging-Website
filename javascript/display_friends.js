let clicked_friend = null;
let messageInterval = null;

const $button = $("#send_btn");
const $text_field = $("#text_bar");

const $friends = $("#friends_list");
const $friend_bar = $("#friend_user");
const $message_list = $("#messages_list");
const $input = $("#search_bar");
const $avatar = $("#f_avatar");
const $top_bar = $("#top_bar");
const $texting_bar = $("#texting_bar");
const $blank_page = $("#blank_page");

function load_messages() {

    if (!clicked_friend) return;

    $.ajax({
        url: "../php/load_messages.php",
        method: "GET",
        dataType: "json",
        data: { friend_id: clicked_friend },
        success: function (data) {
            $message_list.empty();
            data.forEach(m => {
                const $li = $("<li>").text(m.message);
                const $timep = $("<p>", { class: "time" });
                const date = new Date(m.created_at);
                $timep.text(date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
                if (m.sender_id == current_user) {
                    $li.addClass("sent");
                } else {
                    $li.addClass("received");
                }

                $li.append($timep);
                $message_list.append($li);
            });
            $message_list.scrollTop($message_list[0].scrollHeight);
        }
    });
}

function open_conversation(id, name, image) {
    $friend_bar.text(name);
    clicked_friend = id;
    $avatar.attr("src", image);
    
    load_messages();
    if (messageInterval){
        clearInterval(messageInterval);    
    }
    messageInterval = setInterval(load_messages, 1000);
}

$input.on("keyup", () => {
    const val = $input.val().trim();
    $friends.empty();
    load_friends(val);
});

function load_friends(name) {
    $.ajax({
        url: "../php/friends.php",
        method: "GET",
        dataType: "json",
        data: { name: name },
        success: function (data) {
            if (data.length === 0) {
                const $add_friends = $("<p>", {text: "Click here to search for users", class: "no_friends"});
                $add_friends.on("click", () => {
                    window.location.href = "../html/add_friends.html";
                });
                $friends.append($add_friends);
            }else{
                data.forEach(f => {
                    const $li = $("<li>", { class: "friend_item" });
                    const $img = $("<img>", { class: "friend_avatar" }).attr("src", f.image);
                    const $textWrap = $("<div>", { class: "friend_text" });
                    const $name = $("<div>", { class: "friend_name", text: f.name });
                    const $lastMsg = $("<div>", {class: "last_message",text: f.last_message ?? "No messages yet"});
                    const $delete_f = $("<img>", { class: "delete_icon delete_f" })
                    .attr("src", "../images/del.png")
                    .attr("width", 20)
                    .attr("height", 20);

                    $delete_f.on("click", e => {
                        e.stopPropagation();
                        $.ajax({
                            url: "../php/delete_friend.php",
                            method: "POST",
                            data: { f_id: f.id }
                        });
                    });

                    $textWrap.append($name, $lastMsg);
                    $li.append($img, $textWrap, $delete_f);
                    $friends.append($li);

                    $li.on("click", () => {
                        $(".friend_item").removeClass("active");
                        $top_bar.css("display", "flex");
                        $texting_bar.css("display", "grid");
                        $blank_page.css("display", "none");
                        $li.addClass("active");

                        open_conversation(f.id, f.name, f.image);
                        console.log(f.image);
                    });
                });
            }
        }
    });
}

load_friends("");

$button.on("click", () => {
    const text = $text_field.val().trim();

    if (text.length != 0) {
        const formData = new FormData();
        formData.append("receiver_id", clicked_friend);
        formData.append("message", text);

        $.ajax({
            url: "../php/send_message.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false
        });

        $text_field.val("");
        load_messages();
    }
});


$("#profile").on("click", function () {
    window.location.href = "profile.php";
});

$("#requests").on("click", function () {
    window.location.href = "../html/requests.html";
});

