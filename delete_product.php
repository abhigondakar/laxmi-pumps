<?php
include "db.php";

$id = $_POST['id'];

$sql = "DELETE FROM products WHERE product_id='$id'";

if(mysqli_query($conn,$sql)){
echo "deleted";
}else{
echo "error";
}
?>
