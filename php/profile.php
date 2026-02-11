<?php 

session_start();

$id = $_SESSION['id'];
require 'database.php';
$con = database::get();


$sql = "SELECT name,image FROM users
		WHERE id='$id'";

$result = mysqli_query($con,$sql);
$row = mysqli_fetch_assoc($result);

$name = $row['name'];
$image = $row['image'];

?>

<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="../css/profile.css">
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

	</head>
	<body>
		<div class="page">
			<form class="form" id="form" method="POST" action="../php/update_profile.php">
				<p class="profile_txt">Profile</p>
				<img id="avatar" class="avatar" src="<?= $image ?>" height=145 width=145>
				<input name="name" value="<?= $name ?>">
				<input type ="password" name="pass_old" 
				placeholder="Type your old password">
				<input type ="password" name="pass_new" placeholder="Type your new password">
				<div class="button_container">
					<button type="button" id="logout_btn">Logout</button>
					<button type="submit" id="update_btn" >Update</button>
				</div>
			</form>
		</div>
		<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
		<script src="../javascript/edit_profile.js"></script>
	</body>
</html>
