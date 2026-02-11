<?php 

	session_start();
	$current =  $_SESSION['id'];
	$friend_id = $_GET['friend_id'];


	require 'database.php';
	$con = database::get();

	$sql = "SELECT message,sender_id,created_at FROM messages
			WHERE (sender_id='$current' AND receiver_id='$friend_id')
			OR (sender_id='$friend_id' AND receiver_id='$current')";

	$res = mysqli_query($con,$sql);

	$messages = [];

	while ($row = mysqli_fetch_assoc($res)) {
		$messages[] = ["sender_id" => $row['sender_id'],
	   		"message" => $row['message'],
	   		"created_at"=> $row['created_at']];
	}

	echo json_encode($messages);


?>