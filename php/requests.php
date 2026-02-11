<?php
	session_start();
	$current =  $_SESSION['id'];

	require 'database.php';
	$con = database::get();
	$sql = "SELECT u.id, u.username,u.name,u.image
			FROM requests r
			JOIN users u ON r.sender_id = u.id
			WHERE r.receiver_id='$current'";

	$res = mysqli_query($con,$sql);

	$requests = [];

	while ($row = mysqli_fetch_assoc($res)) {
   		$requests[] = ["sender_id" => $row['id'],
   		"sender_username" => $row['username'],
   		"sender_name" => $row['name'],
   		"image" => $row['image']];
	}

	echo json_encode($requests);


?>
