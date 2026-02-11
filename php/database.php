<?php

class Database
{
    private static $conn;

    public static function get()
    {
        self::$conn = new mysqli("localhost", "root", "", "project");
        
        return self::$conn;
    }
}

?>
