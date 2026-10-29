<?php
include "auto_login.php";
include "db.php";


if(!isset($_SESSION['email'])){
    echo "notlogged";
    exit();
}

$email = $_SESSION['email'];

$product_id = $_POST['product_id'];
$pname = $_POST['pname'];
$category = $_POST['category'];
$descrip = $_POST['descrip'];
$rating = floatval($_POST['rating']);
$price = $_POST['price'];
$images = $_POST['images'];

/* CHECK DUPLICATE */
$check = mysqli_query($conn, "SELECT * FROM cart WHERE user_email='$email' AND product_id='$product_id'");

if(mysqli_num_rows($check) > 0){
    echo "exists";
    exit();
}

$query = "INSERT INTO cart(user_email, product_id, pname, category, descrip, rating, price, images)
VALUES('$email','$product_id','$pname','$category','$descrip','$rating','$price','$images')";

if(mysqli_query($conn,$query)){
    echo "added";
}else{
    echo mysqli_error($conn); 
}
?>