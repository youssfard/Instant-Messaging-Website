<?php 

session_start();
$id =  $_SESSION['id'];
$f_id = $_POST['f_id'];


require 'database.php';
$con = database::get();

$sql = "DELETE from friends
		WHERE (user1_id = '$id' AND user2_id = '$f_id') OR 
		(user1_id = '$f_id' AND user2_id = '$id')";

mysqli_query($con,$sql);

?>