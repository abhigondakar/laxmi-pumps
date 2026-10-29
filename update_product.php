<?php
include "db.php";

$id = $_POST['id'];
$name = $_POST['pname'];
$category = $_POST['category'];
$desc = $_POST['descrip'];
$price = $_POST['price'];
$rating = $_POST['rating'];

/* IMAGE CHECK */
if(isset($_FILES['images']) && $_FILES['images']['name'] != ""){

    $images = $_FILES['images']['name'];
    $tmp = $_FILES['images']['tmp_name'];
    
    move_uploaded_file($tmp, "uploads/".$images);

    $sql = "UPDATE products SET 
    pname='$name',
    category='$category',
    descrip='$desc',
    price='$price',
    rating='$rating',
    images='$images'
    WHERE product_id='$id'";

}else{

    $sql = "UPDATE products SET 
    pname='$name',
    category='$category',
    descrip='$desc',
    price='$price',
    rating='$rating'
    WHERE product_id='$id'";
}

if(mysqli_query($conn,$sql)){
echo "updated";
}else{
echo "error";
}
?>