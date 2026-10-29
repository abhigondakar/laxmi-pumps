<?php
include "db.php";

if(isset($_POST['email'])){

    $email = $_POST['email'];

    $query = "SELECT * FROM users WHERE u_email='$email'";
    $result = mysqli_query($conn, $query);

    if(mysqli_num_rows($result) > 0){
        echo "exists";
    } else {
        echo "available";
    }
}
?>