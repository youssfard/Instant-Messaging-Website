<?php
	session_start();

	$user1_id =  $_SESSION['id'];
	$user2_id = $_POST['user2_id'];

	require 'database.php';
	$con = database::get();

	$sql1 = "INSERT INTO friends(user1_id,user2_id)
			VALUES('$user2_id','$user1_id')";

	$sql2 = "DELETE FROM requests 
			WHERE sender_id='$user2_id' AND receiver_id='$user1_id'";

	mysqli_query($con,$sql1);
	mysqli_query($con,$sql2);

?>
