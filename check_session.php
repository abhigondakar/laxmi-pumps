<?php
include "auto_login.php";

if(isset($_SESSION['email'])){
    echo "loggedin";
}else{
    echo "notlogged";
}
?>