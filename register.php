<?php
session_start();
include "db.php";

/* PHPMailer */
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


/* ================= SEND OTP ================= */
if(isset($_POST['action']) && $_POST['action']=="send_otp"){

$name = trim($_POST['u_name']);
$email = trim($_POST['u_email']);
$password = trim($_POST['u_password']);

/* CHECK USER EXISTS */
$check = "SELECT * FROM users WHERE u_email='$email'";
$result = mysqli_query($conn,$check);

if(mysqli_num_rows($result) > 0){
echo "exists";
exit();
}

/* PASSWORD VALIDATION */
if(!preg_match("/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/", $password)){
echo "weakpassword";
exit();
}

/* GENERATE OTP */
$otp = rand(100000,999999);

/* STORE DATA */
$_SESSION['reg_name'] = $name;
$_SESSION['reg_email'] = $email;
$_SESSION['reg_password'] = password_hash($password, PASSWORD_DEFAULT);
$_SESSION['reg_otp'] = $otp;
$_SESSION['reg_otp_time'] = time();

/* SEND MAIL */
$mail = new PHPMailer(true);

try{

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;

$mail->Username = 'laxmipumpstore@gmail.com';
$mail->Password = 'vcjp qyfc cqki xcks';

$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('laxmipumpstore@gmail.com', 'Laxmi Pumps');
$mail->addAddress($email);

$mail->isHTML(true);
$mail->Subject = 'Your Registration OTP';
$mail->Body = "Your OTP is: <b>$otp</b>
<p>This OTP is valid for 60 seconds.....</p>";

$mail->send();

echo "otpsent";

}catch(Exception $e){
echo "Network Error";
}

exit();
}


/* ================= VERIFY OTP ================= */
if(isset($_POST['action']) && $_POST['action']=="verify_otp"){

$userotp = $_POST['otp'];

/* EXPIRY CHECK */
if(time() - $_SESSION['reg_otp_time'] > 60){
echo "expired";
exit();
}


if($userotp == $_SESSION['reg_otp']){

$name = $_SESSION['reg_name'];
$email = $_SESSION['reg_email'];
$password = $_SESSION['reg_password'];

/* INSERT USER */
$insert = "INSERT INTO users(u_name,u_email,u_password)
VALUES('$name','$email','$password')";

if(mysqli_query($conn,$insert)){

$_SESSION['registered'] = true;

echo "verified";

}

}else{
echo "invalid";
}

exit();
}
?>