<?php

session_start();

$id = $_SESSION["id"];
$u  = $_GET["u"];
$u  = trim($u);

if (!isset($_SESSION['id'])) {
  header("Location: ../html/login.html");
  exit;
}

require 'database.php';
$con = database::get();

$sql = "SELECT id, name, username, email
        FROM users
        WHERE id != '$id'
        AND (username LIKE '%$u%' OR name LIKE '%$u%' OR email LIKE '%$u%')";

$res = mysqli_query($con, $sql);

$users = [];

while ($row = mysqli_fetch_assoc($res)) {
    $users[] = [
        "id" => $row['id'],
        "name" => $row['name'],
        "username" => $row['username'],
        "email" => $row['email']
    ];
}

echo json_encode($users);

?>