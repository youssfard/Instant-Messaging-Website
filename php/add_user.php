<?php

session_start();

require 'database.php';
$con = database::get();

$name = $_POST["name"];
$email = $_POST["email"];
$username = $_POST["username"];
$pass = $_POST["password"];
$hash = password_hash($pass, PASSWORD_DEFAULT);

$sql = "INSERT  INTO users(name,email,username,password,image) 
		VALUES('$name','$email','$username','$hash',NULL)";

mysqli_query($con,$sql);

?>