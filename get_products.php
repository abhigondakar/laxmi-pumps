<?php
include "auto_login.php";
include "db.php";

/* FETCH ALL PRODUCTS */
$sql = "SELECT * FROM products ORDER BY product_id DESC";
$result = mysqli_query($conn, $sql);

/* STORE DATA */
$products = [];

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $products[] = $row;
    }
}

/* RETURN JSON */
echo json_encode($products);
?>