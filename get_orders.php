<?php
include "auto_login.php";
include "db.php";

if(!isset($_SESSION['email'])){
    echo json_encode([]);
    exit();
}

$email = $_SESSION['email'];

$result = mysqli_query($conn,"SELECT * FROM orders WHERE user_email='$email' AND o_status='Confirmed' ORDER BY order_id DESC");

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);
?>