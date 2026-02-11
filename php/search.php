<?php

	session_start();


	$search = $_GET['username'];
	$id = $_SESSION['id'];

	require 'database.php';
	$con = database::get();

	$sql = "SELECT *FROM users u
		WHERE u.username LIKE '$search%'
	  	AND u.id != '$id'
	  	AND NOT EXISTS (
		    SELECT 1
		    FROM requests r
		    WHERE r.sender_id = '$id'
		    AND r.receiver_id = u.id)";


	$res = mysqli_query($con,$sql);

	$users = [];

	while ($row = mysqli_fetch_assoc($res)) {
		$users[] = ["id" => $row['id'] , "username" => $row['username'], "name" => $row['name'],"image"=>$row['image']];
	}

	echo json_encode($users);

?>