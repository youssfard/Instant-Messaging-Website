<?php 

	require 'database.php';
	$con = database::get();

	$id = $_POST["id"];


	$sql = "DELETE FROM users
			WHERE id='$id'";

	mysqli_query($con, $sql);

	exit;
?>