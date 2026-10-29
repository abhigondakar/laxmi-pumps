<?php
include "db.php";

$pname = $_POST['pname'];
$category = $_POST['category'];
$descrip = $_POST['descrip'];
$price = $_POST['price'];
$rating = $_POST['rating'];

$images = $_FILES['images']['name'];
$tmp = $_FILES['images']['tmp_name'];

move_uploaded_file($tmp, "uploads/".$images);

$sql = "INSERT INTO products (pname, category, descrip, price, rating, images)
VALUES ('$pname','$category','$descrip','$price','$rating','$images')";

if(mysqli_query($conn,$sql)){
    echo "success";
}else{
    echo "error";
}
?>