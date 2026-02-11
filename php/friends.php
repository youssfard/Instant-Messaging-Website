<?php
    session_start();

    $current = $_SESSION['id'];
    $name = $_GET['name'];

    require 'database.php';
    $con = database::get();


    if(trim($name)===''){
    	$sql = "
        SELECT u.id, u.name,u.image,f.last_message
        FROM friends f
        JOIN users u 
            ON (
                (u.id = f.user1_id AND f.user2_id = '$current')
                OR
                (u.id = f.user2_id AND f.user1_id = '$current')
            )
    ";
    }else{
    	$sql = "
    	    SELECT u.id, u.name,u.image,f.last_message
    	    FROM friends f
    	    JOIN users u 
    	        ON (
    	            (u.id = f.user1_id AND f.user2_id = '$current')
    	            OR
    	            (u.id = f.user2_id AND f.user1_id = '$current')
    	        )
    	    WHERE u.name LIKE '%$name%'
    	";
    }




    $res = mysqli_query($con, $sql);

    $friends = [];

    while ($row = mysqli_fetch_assoc($res)) {
        $friends[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "image" => $row['image'],
            "last_message" => $row['last_message']
        ];
    }

    echo json_encode($friends);
?>