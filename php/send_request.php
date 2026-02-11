<?php


	session_start();

	$sender_id = $_SESSION['id'];
	$receiver_id = $_POST['receiver_id'];
	require 'database.php';
	$con = database::get();

	$sql = "INSERT INTO requests (sender_id,receiver_id)
			VALUES('$sender_id','$receiver_id')";

	mysqli_query($con,$sql);

?>