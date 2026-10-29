<?php
include "auto_login.php";
include "db.php";

/* FETCH ALL PRODUCTS */
$sql = "SELECT * FROM orders ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

/* STORE DATA */
$data = [];

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }
}

/* RETURN JSON */
echo json_encode($data);
?>