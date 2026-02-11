<?php

	session_start();

	require 'database.php';
	$con = database::get();

	$username = $_POST["username"];
	$password = $_POST["password"];

	$sql = "SELECT * FROM users 
			WHERE username='$username'";

	$result = mysqli_query($con,$sql);

	if(mysqli_num_rows($result)== 1){
		$row = mysqli_fetch_assoc($result);
		if(password_verify($password, $row["password"])){
			$_SESSION["name"] = $row["name"];
		    $_SESSION["id"] = $row["id"];
			if($username == "admin"){
				echo "x";
			}else{
				echo 1;
			}
		}
	    
	}else{
		echo 0;
	}

?>