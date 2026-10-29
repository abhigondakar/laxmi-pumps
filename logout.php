<?php
session_start();
include "db.php";

if(isset($_SESSION['email'])){
    $email = $_SESSION['email'];

    mysqli_query($conn, "UPDATE users SET remember_token=NULL WHERE u_email='$email'");
    mysqli_query($conn, "UPDATE admin SET remember_token=NULL WHERE admin_email='$email'");
}

/* delete cookie */
setcookie("remember_token", "", time()-3600, "/");

session_unset();
session_destroy();

echo "logout";
?>