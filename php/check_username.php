<?php


require 'database.php';
$con = database::get();

$username = $_GET['username'];
$email = $_GET['email'];

$result = mysqli_query(
	$con,"SELECT id FROM users WHERE username='$username' OR email='$email'");

if(mysqli_num_rows($result) > 0) {
	echo 0;
}else{
	echo 1;
}

?>