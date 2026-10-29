<?php
session_start();
include "db.php";

$id = $_POST['cart_id'];

mysqli_query($conn, "DELETE FROM cart WHERE cart_id='$id'");

echo "removed";
?>