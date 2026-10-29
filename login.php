<?php
session_start();
include "db.php";

$u_email = $_POST['u_email'];
$u_password = $_POST['u_password'];

/* ================= ADMIN LOGIN ================= */
$admin_sql = "SELECT * FROM admin WHERE admin_email='$u_email'";
$admin_result = mysqli_query($conn, $admin_sql);

if(mysqli_num_rows($admin_result) > 0){

    $row = mysqli_fetch_assoc($admin_result);

    if(password_verify($u_password, $row['admin_password'])){

        /* SESSION */
        $_SESSION['email'] = $u_email;
        $_SESSION['role'] = "admin";

        /* REMEMBER TOKEN */
        $token = bin2hex(random_bytes(32));
        mysqli_query($conn, "UPDATE admin SET remember_token='$token' WHERE admin_email='$u_email'");

        setcookie("remember_token", $token, time() + (86400 * 7), "/");

        echo "admin|" . $row['admin_name'];
    }
    else{
        echo "invalid";
    }

    exit();
}

/* ================= USER LOGIN ================= */
$user_sql = "SELECT * FROM users WHERE u_email='$u_email'";
$user_result = mysqli_query($conn, $user_sql);

if(mysqli_num_rows($user_result) > 0){

    $row = mysqli_fetch_assoc($user_result);

    if(password_verify($u_password, $row['u_password'])){

        /* SESSION */
        $_SESSION['email'] = $u_email;
        $_SESSION['role'] = "user";

        /* REMEMBER TOKEN */
        $token = bin2hex(random_bytes(32));
        mysqli_query($conn, "UPDATE users SET remember_token='$token' WHERE u_email='$u_email'");

        setcookie("remember_token", $token, time() + (86400 * 7), "/");

        echo "user|" . $row['u_name'];
    }
    else{
        echo "invalid";
    }

}
else{
    echo "notregistered";
}
?>