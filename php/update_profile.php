<?php
    session_start();

    $id = $_SESSION['id'];
    $name = $_POST['name'];
    $pass_old = $_POST['pass_old'];
    $pass_new = $_POST['pass_new'];

    require 'database.php';
    $conn = database::get();

    mysqli_query($conn, "UPDATE users SET name='$name' WHERE id='$id'");

    if (!empty($pass_old) && !empty($pass_new)) {

        $res = mysqli_query($conn, "SELECT password FROM users WHERE id='$id'");
        $row = mysqli_fetch_assoc($res);

    	if (strlen($pass_new)<7) {
            echo "wrong_password";
            exit;
        }

        if (!password_verify($pass_old, $row['password'])) {
            echo "wrong_password";
            exit;
        }
    	$new_hash = password_hash($pass_new, PASSWORD_DEFAULT);
        mysqli_query($conn, "UPDATE users SET password='$new_hash' WHERE id='$id'");
    }

    echo "ok";

?>
