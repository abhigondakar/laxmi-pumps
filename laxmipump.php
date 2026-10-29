<!DOCTYPE html>
  <html>
    <head>
      <title>
        Laxmi Pumps E-Commerce Website
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- FontAwesome for Eye Icon -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<!-- External CSS -->
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <header>
        <div class="head">
        <div class="brand">
        <div class="logo" aria-hidden>🛍️</div>
        <div>
          <h1>𝙻𝙰𝚇𝙼𝙸 𝙿𝚄𝙼𝙿𝚂</h1>
          <div class="muted" style="font-size:12px"></div>
        </div>
      </div>

<div class="top-right">
<button id="loginBtn" class="login-btn" onclick="showSection('auth')">Login/Register</button>
<button id="logoutBtn" class="login-btn" onclick="logout()">Logout</button>
<div class="profile-menu">

<div id="profileIcon" class="profile-icon" onclick="toggleProfileMenu()">
<i class="fa fa-user"></i>
</div>

<div id="profileDropdown" class="profile-dropdown">
<a href="#" onclick="logout()">Logout</a>
<a href="#" onclick="signOut()">Delete Account</a>
</div>

</div>

</div>
    </div>
<h2><b>WELCOME TO LAXMI PUMP ONLINE WEBSITE</b></h2>
<nav>
<button onclick="showSection('home')">🏠<b> Home</b></button>
<button onclick="showSection('products')">🚜<b> Products</b></button>
<button onclick="showSection('cart')">🛒 <b>Cart</b></button>
<button onclick="showSection('orders')"> 🚚<b>My Orders</b></button>
<button onclick="showSection('admin')" id="adminSection" style="display:none;"><b>Admin</b></button>
</nav>


<div class="search" role="search">
<input list="productlists" id="search" type="search" placeholder="🔍 Search products in Laxmmi pump.in" />
</div>

</header>

<!-- HOME -->
<div id="home" class="section active">

    <div class="hero">
        <h1>Laxmi Pump Store</h1>
        <p>Your Trusted Pump Solutions 💧</p>
        <button onclick="showSection('products')">Shop Now</button>
    </div>

     <!-- IMAGE / FEATURES SECTION -->
    <div class="features">

        <div class="feature-box" onclick="showSection('products')">
            <img src="images/pump1.jpg" alt="Pump">
             <h3>High Quality Pumps</h3>
            <p>Durable and efficient pumps for every need.</p>
        </div>

        <div class="feature-box" onclick="showSection('products')">
            <img src="images/pump2.jpg" alt="Pump">
            <h3>Agriculture Solutions</h3>
            <p>Perfect pumps for farming and irrigation.</p>
        </div>

        <div class="feature-box" onclick="showSection('products')">
            <img src="images/pump3.jpg" alt="Pump">
            <h3>Industrial Use</h3>
            <p>Powerful pumps for heavy-duty operations.</p>
        </div>

    </div>
    <div class="about">
        <h2>About Us</h2>
        <p>
            Welcome to Laxmi Pump Store. We provide high-quality water pumps 
            and accessories for homes, agriculture, and industries. 
            Our mission is to deliver reliable and affordable solutions.
        </p>

        <p>
            Laxmi Pump Store is a leading provider of premium water pump solutions 
            designed for homes, agriculture, and industrial applications. With years 
            of experience in the industry, we focus on delivering reliable, efficient, 
            and cost-effective pumping systems.
        </p>

        <p>
            Our product range includes high-performance submersible pumps, 
            centrifugal pumps, and motor systems that are built using advanced 
            technology to ensure durability and long-lasting performance.
        </p>

        <p>
            We believe in customer satisfaction, which is why we offer easy ordering, 
            fast delivery, and responsive customer support. Our goal is to make water 
            management simple, efficient, and affordable for everyone.
        </p>
    </div>

    <div class="contact">
        <h2>Contact Us</h2>
    <p><i class="fas fa-phone"></i> +91 6361443915</p>

    <p><i class="fas fa-envelope mainfa-envelope"></i> laxmipumpstore@gmail.com</p>

    <p><i class="fas fa-location-dot"></i>  India</p>
        
         <div class="social">

    <a href="https://instagram.com/_gondkar_abhi" target="_blank">
    <i class="fab fa-instagram"></i> Instagram
</a>

    <a href="https://youtube.com/yourchannel" target="_blank">
        <i class="fab fa-youtube"></i>YouTube
    </a>

    <a href="https://wa.me/6361443915" target="_blank">
        <i class="fab fa-whatsapp"></i>WhatsApp
    </a>

</div>
    </div>
   

     <!-- FOOTER -->
    <footer class="footer">

            <div class="footer-box">
                <h3>Laxmi Pump</h3>
                <p>
                    Providing high-quality water pump solutions for homes, farms, 
                    and industries with reliability and trust.
                </p>
            </div>
        
        <div class="footer-bottom">
            <p>© 2026 Laxmi Pump Store | All Rights Reserved</p>
        </div>

    </footer>


</div>

<!-- PRODUCTS -->

<div id="products" class="section">
  <h3 style="text-align: center; font-size: 30px; font-weight: bold;"><u>Laxmi Pump Products</u></h3>
  <div id="productSection" class="products"></div>
</div>

<!-- CART -->
<div id="cart" class="section">
  <h2 style="text-align: center";>MY Cart</h2>
  <h3 style="text-align: center";>Add more products from the Products section</h3>
  <hr>
<div id="cart-items" class="products"></div>
</div>

<!-- User Orders -->
 <div id="orders" class="section">
  <h2 style="text-align: center";>Orders</h2>
  <hr>
  <div id="myOrders" class="products"></div>
</div>

<!-- CHECKOUT -->
<div id="checkout" class="section">
<h2 style="text-align: center">Place Order</h2>
<form onsubmit="placeOrder(event)">
  <center>
    <table>
       <caption>
         <tr>
           <td><b>Enater Full Name:</b></td>
<td><input type="text" id="name" placeholder="Full Name" size=30 required></td>
</tr>
<!-- PHONE WITH COUNTRY CODE -->
     <tr>
  <td><b>Enter contact number:</b></td>
<td>
<input value="IND +91" size=3 readonly>
<input type="tel" id="phone"maxlength="10" placeholder="Phone Number" size=20 required>
</td>
</tr>
<tr>
  <td><b>Enter The Address:</b></td>
  <td>
<textarea type="text" id="landmark" style="width:100%; height:150px; font-size: 17px;" required> </textarea> 
</td>
</tr>
<tr>
  <td><b>Enter the pin Code:</b></td>
  <td> 
<input type="text" id="pincode"  maxlength="6" pattern="\d{6}" placeholder="Pincode" size=10 required>
<b>city:</b>
<input type="text" id="city" placeholder="City" size=20 required>
</td>
</tr>
<tr>
  <td><b>State:</b></td>
<td>
<input type="text" id="state" placeholder="State" size=30  required>
</td>
</tr>
</table>
<p style="font-size: 20px; "><b>&bull; Our staff will call your phone number to confirm the order</b>
<button onclick="placeOrder()" class="btn"  style="margin-top:10px;">Place Order</button>
</center>
</form>
</div>

<!-- ADMIN -->
<div id="admin" class="section">
<div class="adminsection ">
<h2 style="text-align: center;">Admin Dashboard</h2>
</br>
<div class="adnav-button">
<button class="ad-button" onclick="showadminmain()"><b>Admin Main Page</b></button>
<button  class="ad-button" onclick="showaddproduct()"><b>Add Product</b></button>
<button class="ad-button" onclick="showviewProducts(); fetchProductsForAdmin();"><b>View Products</b></button>
<button class="ad-button" onclick="showproductstatus()"><b>Update Orders Status</b></button>
<button class="ad-button" onclick="showviewUsers(); loadUsers();"><b>View Users</b></button>
</div>
</div>

<div id="adminmain" class="admin-container">
    <div class="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your products, orders, and store efficiently</p>
    </div>
  </div>

  <div id="addProduct" style="display:none;" class="addmodal-content">
        <h2 style="text-align:center;">Add Product</h2>

        <form id="addProductForm" onsubmit="addProduct(event)" enctype="multipart/form-data">

            <input type="text" id="pname" name="pname" class="modal-input" placeholder="Product Name" required><br>

            <input type="text" id="category" name="category" class="modal-input" placeholder="Category" required><br>

            <textarea id="descrip" name="descrip" style="width:83.55%; height:50px; margin-top:5px;" placeholder="Description"  required></textarea><br>

            <input type="double" id="price" name="price" class="modal-input" placeholder="Price" required><br>

            <input type="number" step="0.1" id="rating" class="modal-input" name="rating" placeholder="Rating (0-5)" required><br>

            <input type="file" id="images" name="images" claas="modal-input" accept="image/*" required><br>

            <button class="btn">Add Product</button>

        </form>
    </div>

<div id="viewProducts" style="display:none;">
    <h2 style="text-align: center;"><br><b>Laxmi Pump Products</b></h2>

    <table border="2" id="productTable">
        <thead>
            <tr>
                <th>Product_id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    
    
 <!-- EDIT PRODUCT MODAL -->
<div id="editModal" class="modal">

    <div class="modal-content">
        <h2>Edit Product</h2>
          <form id="editForm" enctype="multipart/form-data">

    <input type="hidden" id="edit_id">

    <input type="text" id="edit_name" class="modal-input" placeholder="Product Name"><br>

    <input type="text" id="edit_category" class="modal-input" placeholder="Category"><br>
    
    <textarea id="edit_desc" style="width:83.55%; height:50px; margin-top:5px;" placeholder="Description"></textarea><br>

    <input type="number" id="edit_price" class="modal-input" placeholder="Price"><br>

    <input type="number" step="0.1" id="edit_rating" class="modal-input" placeholder="Rating"><br>

    <input type="file" id="edit_image" accept="image/*"><br>

    <button type="button" onclick="updateProduct()" class="btn">Update</button><br>
    <button type="button" onclick="closeModal()" class="cbtn">Cancel</button>

</form>
    </div>

</div>
</div>
<div class="input-group" id="productstatus" style="display:none;">
<!-- ORDER FILTER -->
<h2 style="text-align: center;"><b>All Orders</b></h2>

<table border="2" id="ordersTable" style="width:100%; text-align:center;">
    <thead>
        <tr>
            <th>Order ID</th>
            <th>User Email</th>
            <th>user name</th>
            <th>contact NUmber</th>
            <th>city</th>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Update</th>
            <th>Invoice</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
</div>
  
<div id="viewUsers" style="display:none;">
    <h2 style="text-align: center;"><br><b>Laxmi Pump Registered Users</b></h2>
</br>
    <table border="2"  id="userTable">
        <thead>
            <tr>
                <th width="50%"><b>Name</b></th>
                <th width="50%"><b>Email</b></th>
            </tr>
        </thead>
        <tbody>  </tbody>
    </table>
</div>
</div>

<!-- AUTH -->
<div id="auth" class="section">
<div class="auth-box">
<h2 id="authTitle">Login</h2>

<!--login form-->
<form id="loginForm" onsubmit="loginUser(event)">
  
<div class="input-group">
<input class="email" type="email" id="loginEmail" name="u_email" placeholder=" " required>
<label>Email Address</label>
 <i class="fa fa-envelope envelope-icon"></i>
</div>

<div class="password-container">
<div class="input-group">
<input class="input-group" type="password" id="loginPassword" name="u_password" placeholder=" " required>
 <label>Password</label>
<i class="fas fa-eye-slash toggle-password"
onclick="togglePassword('loginPassword', this)"></i>
<div class="forgot"> 
<a href="#" onclick="showforgot()">Forgot password?</a>
</div>
</div>
</div>

<div style="margin-top:10px;">    
    <b>Captcha:</b><br>
    <input type="text" id="captchaDisplay" readonly 
    style="width:120px; font-weight:bold; text-align:center;">
    <button type="button" onclick="generateCaptcha()">🔄</button>
    <br><br>
    <lable> Enter Captcha</label>
    <div class="input-group">
    <input type="text" id="captchaInput" placeholder=" " required>
</div>
</div>

<button class="log-btn" type="button" onclick="loginUser(event)">Login</button>
<p style="text-align: center;">Create new account? <a href="#" onclick="showRegister()">Register</a></p>
</form>

<!--Register form-->
<form id="registerForm" style="display:none;" onsubmit="registerUser(event)">

<div class="input-group">  
<input class="name" type="text" id="regName" name="u_name" placeholder=" " required>
<label>Full Name</label>
<i class="fa fa-user user-icon"></i>
</div>
<div class="input-group">  
<input class="email" type="email" id="regEmail" name="u_email" placeholder=" " required>
<label>Email Address</label>
 <i class="fa fa-envelope envelope-icon"></i>
</div>
<span id="emailMsg" style="font-size:14px;"></span>

<div class="password-container">
<div class="input-group">
<input type="password" id="regPassword" name="u_password" placeholder=" " required>
<label>Password</label>
<i class="fas fa-eye-slash toggle-password"
onclick="togglePassword('regPassword', this)"></i>
</div>
</div>
<div style="text-align:center;">
<button class="log-btn" id="registerBtn">Register</button>
</div>

<div id="registerOtpSection" style="display:none;">

<div class="otp-box">
<input type="text" class="reg-otp" maxlength="1">
<input type="text" class="reg-otp" maxlength="1">
<input type="text" class="reg-otp" maxlength="1">
<input type="text" class="reg-otp" maxlength="1">
<input type="text" class="reg-otp" maxlength="1">
<input type="text" class="reg-otp" maxlength="1">
</div>
<div class="timer" id="reg-timer">60s</div>
<button class="log-btn" type="button" onclick="verifyRegisterOTP()">Verify OTP</button><br>

<div style="text-align:center;">
<button class="resend-btn" type="button" style="display:none;" id="reg-resendBtn" onclick="resendRegisterOTP()">Resend OTP</button>
</div>

</div>
<p style="text-align: center;">Already have account? <a href="#" onclick="showLogin()">Login</a></p>
</form>

<!--Forgot form-->
<form id="forgotForm" style="display:none;" onsubmit="sendOTP(event)"> 

<div class="input-group">  
<input class="email" type="email" id="forgotEmail" name="u_email" placeholder=" " required>
<label>Email Address</label>
 <i class="fa fa-envelope envelope-icon"></i>
</div>
<button id="sendOtpBtn" class="log-btn" onclick="sendOTP()">Send OTP</button>


<div id="otpSection" style="display:none">

<div class="otp-box">
<input maxlength="1" class="otp">
<input maxlength="1" class="otp">
<input maxlength="1" class="otp">
<input maxlength="1" class="otp">
<input maxlength="1" class="otp">
<input maxlength="1" class="otp">
</div>

<div class="timer" id="timer">60s</div>


<button class="log-btn" type="button" onclick="verifyOTP()">Verify OTP</button><br>
<div style="text-align:center;">
<button class="resend-btn" type="button" style="display:none;" id="resendBtn" onclick="resendOTP()">Resend OTP</button>
</div>
</div>
<p style="text-align: center;">Back To Login: <a href="#" onclick="showLogin()">Login</a></p>
</form>

<form id="passwordSection" style="display:none;" onsubmit="updatePassword(event)">

 <div class="password-container">
    <div class="input-group"> 
      <input class="input-group" type="password" id="newPassword"  placeholder=" " required> 
      <label>New Password</label> 
      <i class="fas fa-eye-slash toggle-password" onclick="togglePassword('newPassword', this)"></i>
    </div> 
  </div>
  
  <div class="password-container">
    <div class="input-group"> 
      <input type="password" id="confirmPassword" placeholder=" " required> 
      <label>Confirm Password</label> 
      <i class="fas fa-eye-slash toggle-password" onclick="togglePassword('confirmPassword', this)"></i> 
    </div> 
  </div>
  
  <button class="log-btn" onclick="updatePassword()">Update Password</button>
</form>
</div>
</div>

<!-- External JS --> 
<script src="script.js"></script>

</body>
</html>