<?php 

	require 'database.php';
	$con = database::get();

	$name = $_POST["name"];
	$username = $_POST["username"];
	$email = $_POST["email"];
	$id = $_POST["id"];

	$sql = "UPDATE users 
			SET name='$name', username='$username', email='$email'
			WHERE id='$id'";

	mysqli_query($con, $sql);

	exit;
?>