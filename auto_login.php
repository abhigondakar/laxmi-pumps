<?php
if(session_status() === PHP_SESSION_NONE){
    session_start();
}

include "db.php";

/* AUTO LOGIN */
if(!isset($_SESSION['email']) && isset($_COOKIE['remember_token'])){

    $token = $_COOKIE['remember_token'];

    // USER
    $user = mysqli_query($conn, "SELECT * FROM users WHERE remember_token='$token'");
    if(mysqli_num_rows($user) > 0){
        $row = mysqli_fetch_assoc($user);
        $_SESSION['email'] = $row['u_email'];
        $_SESSION['role'] = "user";
    }

    // ADMIN
    $admin = mysqli_query($conn, "SELECT * FROM admin WHERE remember_token='$token'");
    if(mysqli_num_rows($admin) > 0){
        $row = mysqli_fetch_assoc($admin);
        $_SESSION['email'] = $row['admin_email'];
        $_SESSION['role'] = "admin";
    }
}
?>