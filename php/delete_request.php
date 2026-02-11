<?php 

session_start();
$id =  $_SESSION['id'];
$u_id = $_POST['clicked_id'];


require 'database.php';
$con = database::get();

$sql = "DELETE from requests
		WHERE sender_id = '$u_id' AND receiver_id = '$id'";

mysqli_query($con,$sql);

?>