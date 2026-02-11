<?php

	session_start();

	require 'database.php';
	$con = database::get();

	$name = $_POST["name"];
	$email = $_POST["email"];
	$username = $_POST["username"];
	$pass = $_POST["password"];
	$hash = password_hash($pass, PASSWORD_DEFAULT);

	$img = "../uploads/" . $_FILES['image']['name'];
	$in  = fopen($_FILES['image']['tmp_name'], "rb");
	$out = fopen("../uploads/" . $_FILES['image']['name'], "wb");

	while ($data = fread($in, 8192)) {
		fwrite($out, $data);
	}

	fclose($in);
	fclose($out);

	$sql = "INSERT  INTO users(name,email,username,password,image) 
			VALUES('$name','$email','$username','$hash','$img')";

	mysqli_query($con,$sql);

	$userId = mysqli_insert_id($con);
	session_regenerate_id(true);

	$_SESSION["username"] = $username;
	$_SESSION["id"] = $userId;

	echo "ok";
?>