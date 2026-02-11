$(function () {
    const $results = $("#users");
    const $input = $("#search_bar");

    const $editModal = $("#editModal");
    const $editId = $("#edit_id");
    const $editUsername = $("#edit_username");
    const $editName = $("#edit_name");
    const $editEmail = $("#edit_email");
    const $editSave = $("#editSave");
    const $editCancel = $("#editCancel");

    const $addModal = $("#addModal");
    const $addBtn = $("#add");

    const $addSave = $("#addSave");
    const $addCancel = $("#addCancel");

    const $addUsername = $("#add_username");
    const $addName = $("#add_name");
    const $addEmail = $("#add_email");
    const $addPassword = $("#add_password");

    const $logout = $("#logout");

    function search(username) {
        $.getJSON("../php/list_users.php", { u: username })
        .done(function (data) {
            $results.empty();
            data.forEach(function (u) {
                const $row = $("<tr>");

                $("<td>").text(u.id).appendTo($row);
                $("<td>").text(u.username).appendTo($row);
                $("<td>").text(u.name).appendTo($row);
                $("<td>").text(u.email).appendTo($row);

                const $actions = $("<td>");

                $("<button>").text("Edit").addClass("edit").on("click", function () {
                    openEditModal(u);
                }).appendTo($actions);

                $("<button>").text("Delete").addClass("delete").on("click", function () {
                    delete_user(u.id);
                }).appendTo($actions);

                $actions.appendTo($row);
                $results.append($row);
            });
        });
    }

    function openEditModal(u) {
        $editId.val(u.id);
        $editUsername.val(u.username);
        $editName.val(u.name);
        $editEmail.val(u.email);
        $editModal.css("display", "block");
    }

    function delete_user(id) {
        const formData = new FormData();
        formData.append("id", id);

        $.ajax({
            url: "../php/delete_user.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false
        });
        search($input.val());
    }

    $logout.on("click", function () {
        window.location.href = "../php/logout.php";
    });

    $addBtn.on("click", function () {
        $addModal.css("display", "block");
    });

    $addSave.on("click", function () {
        const formData = new FormData();
        formData.append("username", $addUsername.val());
        formData.append("name", $addName.val());
        formData.append("email", $addEmail.val());
        formData.append("password", $addPassword.val());

        $.ajax({
            url: "../php/add_user.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false
        });

        $addModal.css("display", "none");
        search($input.val());
    });

    $addCancel.on("click", function () {
        $addModal.css("display", "none");
    });

    $editCancel.on("click", function () {
        $editModal.css("display", "none");
    });

    $editSave.on("click", function () {
        const formData = new FormData();
        formData.append("id", $editId.val());
        formData.append("username", $editUsername.val());
        formData.append("name", $editName.val());
        formData.append("email", $editEmail.val());
        $.ajax({
            url: "../php/update_user.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false
        });
        $editModal.css("display", "none");
        search($input.val());
    });
    $input.on("keyup", function () {
        search($input.val());
    });
    
    search("");
});