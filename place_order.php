<?php
include "auto_login.php";
include "db.php";

/* DEBUG (REMOVE LATER) */
error_reporting(E_ALL);
ini_set('display_errors', 1);

/* GET JSON DATA */
$data = json_decode(file_get_contents("php://input"), true);

/* CHECK LOGIN */
if(!isset($_SESSION['email'])){
    echo "login required";
    exit();
}

$email = $_SESSION['email'];

/* ===== USER DETAILS ===== */
$uname = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$o_address = $data['landmark'] ?? '';
$city = $data['city'] ?? '';
$o_state = $data['state'] ?? '';
$pincode = $data['pincode'] ?? '';

/* ===== PRODUCT DETAILS ===== */
$product_id = $data['product_id'] ?? '';
$pname = $data['pname'] ?? '';
$price = $data['price'] ?? 0;
$images = $data['image'] ?? '';

/* ===== ORDER ID FROM JS ===== */
$order_id = $data['order_id'] ?? '';

/* VALIDATION */
if(empty($uname) || empty($phone) || empty($product_id) || empty($order_id)){
    echo "missing data";
    exit();
}

/* INSERT INTO DATABASE */
$query = "INSERT INTO orders
(order_id, user_email, uname, phone, o_address, city, o_state, pincode,
 product_id, pname, price, images, o_status)
VALUES
('$order_id', '$email', '$uname', '$phone', '$o_address', '$city', '$o_state', '$pincode',
 '$product_id', '$pname', '$price', '$images', 'Processing')";


if(mysqli_query($conn, $query)){
    echo "success";
}else{
    echo mysqli_error($conn);
}
?>