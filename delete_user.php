<?php
session_start();
include "db.php";

/* GET USER EMAIL (from session or request) */
$email = $_SESSION['email']; // or $_POST['email']

/* 1. REMOVE TOKEN FROM DATABASE */
mysqli_query($conn, "UPDATE users SET remember_token=NULL WHERE u_email='$email'");

/* 2. DELETE USER FROM TABLE */
mysqli_query($conn, "DELETE FROM users WHERE u_email='$email'");

/* 3. DELETE COOKIE */
setcookie("remember_token", "", time()-3600, "/");

/* 4. DESTROY SESSION */
session_unset();
session_destroy();

echo "deleted";
?>