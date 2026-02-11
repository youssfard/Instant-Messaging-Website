<?php 

session_start();

$sender_id = $_SESSION['id'];
$receiver_id = $_POST['receiver_id'];
$message = $_POST['message'];

require 'database.php';
$con = database::get();

$sql = "INSERT INTO messages (sender_id,receiver_id,message)
		VALUES('$sender_id','$receiver_id','$message')";

$sql2 = "UPDATE friends
		SET last_message = '$message'
		WHERE (user1_id = '$sender_id' AND user2_id = '$receiver_id')
  		OR (user1_id = '$receiver_id' AND user2_id = '$sender_id');";

mysqli_query($con,$sql);
mysqli_query($con,$sql2);



?>