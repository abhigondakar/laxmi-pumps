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

$email = trim($_POST['u_email']);

$check = "SELECT * FROM users WHERE u_email='$email'";
$result = mysqli_query($conn,$check);

if(mysqli_num_rows($result)==0){
echo "notfound";
exit();
}

$otp = rand(100000,999999);

$_SESSION['otp'] = $otp;
$_SESSION['email'] = $email;
$_SESSION['otp_time'] = time();  // store time

/* SEND MAIL */
$mail = new PHPMailer(true);

try{

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;

$mail->Username = 'laxmipumpstore@gmail.com';   // gmail
$mail->Password = 'vcjp qyfc cqki xcks';     // app password

$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('laxmipumpstore@gmail.com', 'Laxmi Pumps');
$mail->addAddress($email);

$mail->isHTML(true);
$mail->Subject = 'Your Password Reset OTP';
$mail->Body = "Your OTP is: <b>$otp</b>
<p>This OTP is valid for 60 seconds.....</p>";

$mail->send();
echo "otpsent";

}catch(Exception $e){
echo "error";
}

exit();
}


/* ================= VERIFY OTP ================= */
if(isset($_POST['action']) && $_POST['action']=="verify_otp"){

$userotp = $_POST['otp'];

/* check expiry (60 sec) */
if(time() - $_SESSION['otp_time'] > 60){
echo "expired";
exit();
}

if($userotp == $_SESSION['otp']){
echo "verified";
}else{
echo "invalid";
}

exit();
}

/* ================= UPDATE PASSWORD ================= */
if(isset($_POST['action']) && $_POST['action']=="update_password"){


$email = $_SESSION['email'];
$u_password = password_hash($_POST['u_password'], PASSWORD_DEFAULT); 

$update = "UPDATE users SET u_password='$u_password' WHERE u_email='$email'";

if(mysqli_query($conn,$update)){
echo "updated";
}else{
echo "error";
}

exit();
}
?>