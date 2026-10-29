<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "laxmi_pump";

$conn = mysqli_connect($host,$user,$password,$database);

if(!$conn){
    die("Database Connection Failed");
}

?>