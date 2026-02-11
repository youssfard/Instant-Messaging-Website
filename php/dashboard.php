<?php

session_start();

if (!isset($_SESSION['id'])) {
	header("Location: ../html/login.html");
	exit;
}
?>

<!DOCTYPE html>
<html>
	<head>
    	<title>Home</title>
    	<link rel="stylesheet" href="../css/dash.css">
    	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
	</head>
	<body>
		<div class="container">
			<div class="left">
				<div class="top_left_bar"> 
					<p class="messages_text"> Messages</p>
					<div class="icons">
						<img class="requests" src="../images/notifs.png" id="requests" height=20 width=20>
						<img class="profile" src="../images/profile.png" id="profile" height=20 width=20 >
					</div>
				</div>
				<input class="search_bar" id="search_bar" placeholder="Search for friends ..">
				<ul id="friends_list" class="friends_list"></ul>
			</div>
			<div class="right">
				<div id="blank_page" class="blank_page">
					<img src="../images/texting.png" height=40 width=40 >
					<p> Select a friend <br>to start chatting! <p> 
				</div>
				<div class="top_bar" id="top_bar">
					<img src="../images/default.png" height=40 width=40 id="f_avatar" class="f_avatar">
					<h3 id="friend_user" class="friend_user"></h3>
				</div>
				<div class="chat_bar">
					<ul id="messages_list" class="messages_list"></ul>
				</div>
				<div class="texting_bar" id="texting_bar">
					<input type="text" class="text_bar" id="text_bar" placeholder="Type your message ..">
					<button class="send_btn" id="send_btn"></button>
				</div>
			</div>
		</div>

		<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
		<script>
	  		const current_user = <?= $_SESSION['id'] ?>;
		</script>
		<script src="../javascript/display_friends.js"></script>
	</body>
</html>
