/* SECTION NAVIGATION */
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showaddproduct(){
    document.getElementById("addProduct").style.display="block";
    document.getElementById("productstatus").style.display="none";
    document.getElementById("viewProducts").style.display="none";
    document.getElementById("adminmain").style.display="none";
    document.getElementById("viewUsers").style.display="none";  
    document.getElementById("editModal").style.display="none";

}

function showproductstatus(){
    document.getElementById("addProduct").style.display="none";
    document.getElementById("productstatus").style.display="block";
    document.getElementById("viewProducts").style.display="none";
    document.getElementById("adminmain").style.display="none";  
      document.getElementById("viewUsers").style.display="none";
        document.getElementById("editModal").style.display="none";
    }

function showadminmain(){
    document.getElementById("addProduct").style.display="none";
    document.getElementById("productstatus").style.display="none";
    document.getElementById("viewProducts").style.display="none";
    document.getElementById("adminmain").style.display="block";
    document.getElementById("viewUsers").style.display="none";
    document.getElementById("editModal").style.display="none";
}

function showviewUsers(){
    document.getElementById("addProduct").style.display="none";
    document.getElementById("productstatus").style.display="none";
    document.getElementById("viewProducts").style.display="none";
    document.getElementById("adminmain").style.display="none";
    document.getElementById("viewUsers").style.display="block";
    document.getElementById("editModal").style.display="none";
}
function showviewProducts(){
    document.getElementById("addProduct").style.display="none";
    document.getElementById("productstatus").style.display="none";
    document.getElementById("viewProducts").style.display="block";
    document.getElementById("adminmain").style.display="none";
    document.getElementById("viewUsers").style.display="none";
    }

/* PRODUCTS */

let products = []; // GLOBAL
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function loadProducts(){

fetch("get_products.php")
.then(res=>res.json())
.then(data=>{

products = data;          // STORE ALL PRODUCTS
displayProducts(products); // SHOW PRODUCTS
});
}

function displayProducts(data){

    if(data.length === 0){
    html = "<h2 style='text-align:center'>No Products Found</h2>";
}

let html = "";

data.forEach(p => {
html += `
<div class="product">
<div class="product-media">
<img src="uploads/${p.images}" width="150">
</div>

<h3>${p.pname}</h3>
<p>Category: ${p.category}</p>
<p>${p.descrip}</p>
<p class="product-rating">Rating: ⭐ ${p.rating}</p>
<div class="price-container">
<h3 class="product-price">₹ ${p.price}</h3>
<span class="gst-text">+ 18% GST</span>
</div>

<button class="addchart-btn" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
<button class="buy-btn" onclick='buyNow(${JSON.stringify(p)})'>Buy Now</button>

</div>
<hr>
`;
});

document.getElementById("productSection").innerHTML = html;
}

document.getElementById("search").addEventListener("input", function(){

let value = this.value.toLowerCase();

/* SWITCH TO PRODUCT SECTION */
showSection("products");  

/* FILTER PRODUCTS */
let filtered = products.filter(p => 
    p.pname.toLowerCase().includes(value) ||
    p.category.toLowerCase().includes(value) ||
    p.descrip.toLowerCase().includes(value)
);

displayProducts(filtered);

});

function addToCart(product){

fetch("add_to_cart.php",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body: `product_id=${product.product_id}
&pname=${encodeURIComponent(product.pname)}
&category=${encodeURIComponent(product.category)}
&descrip=${encodeURIComponent(product.descrip)}
&rating=${product.rating}
&price=${product.price}
&images=${product.images}`
})
.then(res=>res.text())
.then(data=>{
console.log("SERVER RESPONSE:", data);
if(data === "notlogged"){
alert("Please login first");
showLogin();
}
else if(data === "exists"){
alert("Already in cart");
}
else if(data === "added"){
alert("Added to Cart");
}
else{
alert("Error: " + data);
}
loadCart();
});
}

function loadCart(){

fetch("get_cart.php")
.then(res=>res.json())
.then(data=>{
let html = "";

if(data.length === 0){
html = "<center><p style='font-size: 33px; margin: 80px 500px;'><b><i>Your Cart is Empty Add the New product</b><p><center>";
}

data.forEach(p => {

html += `
<div class="product">
<div class="product-media">
<img src="uploads/${p.images}" width="150">
</div>
<h3>${p.pname}</h3>
<p>Category: ${p.category}</p>
<p>${p.descrip}</p>
<p class="product-rating">Rating:⭐ ${p.rating}</p>
<h4 class="product-price">₹ ${p.price}</h4>


<button class="buy-btn" onclick='buyNow(${JSON.stringify(p)})'>Buy Now</button>
<button class="remove-btn" onclick="removeCart(${p.cart_id})">Remove From Cart</button>


</div>
<hr>
`;

});
document.getElementById("cart-items").innerHTML = html;
});

}

function removeCart(id){

fetch("remove_cart.php",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body: "cart_id="+id
})
.then(res=>res.text())
.then(()=>{
loadCart();
});
}


/* Add product (Admin) */
function addProduct(e){
e.preventDefault();

let formData = new FormData(document.getElementById("addProductForm"));
    const pname = document.getElementById("pname").value;
    const category = document.getElementById("category").value;
    const descrip = document.getElementById("descrip").value;
    const price = document.getElementById("price").value;
    const rating = document.getElementById("rating").value;
    const images = document.getElementById("images").value;

fetch("add_product.php",{
method:"POST",
body:formData
})
.then(res=>res.text())
.then(data=>{
if(data.trim()==="success"){
alert("Product Added Successfully");
loadProducts();  // refresh products
document.getElementById("pname").value="";
document.getElementById("category").value="";
document.getElementById("descrip").value="";
document.getElementById("price").value="";
document.getElementById("rating").value="";
document.getElementById("images").value="";
}else{
alert("Error adding product");
}
});
}


function fetchProductsForAdmin(){

fetch("get_products.php")
.then(res => res.json())
.then(data => {

let table = document.querySelector("#productTable tbody");
table.innerHTML = "";

data.forEach(p => {

let row = `
<tr>
<td>${p.product_id}</td>
<td><img src="uploads/${p.images}" width="60"></td>
<td>${p.pname}</td>
<td>${p.category}</td>
<td>${p.descrip}</td>
<td>₹ ${p.price}</td>
<td>${p.rating}</td>

<td>
<button onclick="openEditModal(${p.product_id}, \`${p.pname}\`, \`${p.category}\`, \`${p.descrip}\`, ${p.price}, ${p.rating})" class="proed-btn">Edit</button>

<button onclick="deleteProduct(${p.product_id})" class="prodel-btn">Delete</button>
</td>
</tr>
`;

table.innerHTML += row;

});

});
}

function openEditModal(id, name, category, desc, price, rating){

document.getElementById("editModal").style.display = "flex";

/* fill data */
document.getElementById("edit_id").value = id;
document.getElementById("edit_name").value = name;
document.getElementById("edit_category").value = category;
document.getElementById("edit_desc").value = desc;
document.getElementById("edit_price").value = price;
document.getElementById("edit_rating").value = rating;
}


function closeModal(){
document.getElementById("editModal").style.display = "none";
}

function updateProduct(){

let formData = new FormData();

/* GET VALUES */
formData.append("id", document.getElementById("edit_id").value);
formData.append("pname", document.getElementById("edit_name").value);
formData.append("category", document.getElementById("edit_category").value);
formData.append("descrip", document.getElementById("edit_desc").value);
formData.append("price", document.getElementById("edit_price").value);
formData.append("rating", document.getElementById("edit_rating").value);

/* IMAGE (OPTIONAL) */
let file = document.getElementById("edit_image").files[0];
if(file){
    formData.append("images", file);
}

/* SEND DATA */
fetch("update_product.php",{
    method:"POST",
    body:formData
})
.then(res => res.text())
.then(data => {

    data = data.trim();
    console.log("UPDATE RESPONSE:", data);

    if(data === "updated"){
        alert("Product Updated Successfully");
        closeModal();
        fetchProductsForAdmin(); // reload table
        loadProducts();
    }else{
        alert("Update Failed");
    }

});
}

function deleteProduct(id){

if(!confirm("Are you sure to delete?")) return;

fetch("delete_product.php",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:"id="+id
})
.then(res=>res.text())
.then(()=>{
alert("Product Deleted");
fetchProductsForAdmin(); // reload table
loadProducts();
});

}


function loadUsers(){

fetch("get_users.php")
.then(res => res.json())
.then(data => {

let table = document.querySelector("#userTable tbody");
table.innerHTML = "";

data.forEach(user => {

let row = `
<tr>
<td>${user.u_name}</td>
<td>${user.u_email}</td>
</tr>
`;

table.innerHTML += row;

});

});
}

/* ORDER MANAGEMENT */
/*global flag of phone number*/
let isPhoneValid = false;

document.getElementById("phone").addEventListener("input", function(){

    let phone = this.value;

    /* ONLY NUMBERS */
    this.value = phone.replace(/\D/g, '');

    /* VALIDATION */
    if(/^[6-9]\d{9}$/.test(this.value)){
        isPhoneValid = true;   //VALID
    } else {
        isPhoneValid = false;  //INVALID
    }

});
/*global flag of pincode - validation disabled*/
let isPincodeValid = true; // Always true - no validation needed
/* CHECKOUT */
function buyNow(product){
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    showSection("checkout");
}

function placeOrder(e){
    e.preventDefault();

    
    if(!localStorage.getItem("loggedUser")){
        alert("Please Login First!");
        showSection('auth');
        return;
    }
    
    /* GET PRODUCT */
    let product = JSON.parse(localStorage.getItem("buyNowProduct"));

    if(!product){
        alert("No product selected");
        return;
    }
        /* PHONE VALIDATION */
    if(!isPhoneValid){
        alert("Please enter a valid 10-digit phone number");
        return;
    }



    /* GENERATE ORDER ID IN JS */
    let order_id = "ORD" + Math.floor(Math.random()*1000000);

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let landmark = document.getElementById("landmark").value;
    let pincode = document.getElementById("pincode").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;

    /* SEND BOTH FORM + PRODUCT */
    fetch("place_order.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            order_id: order_id,
            name: name,
            phone: phone,
            landmark: landmark,
            pincode: pincode,
            city: city,
            state: state,

            /*PRODUCT DATA */
            product_id: product.product_id,
            pname: product.pname,
            price: product.price,
            image: product.images
        })
    })
    .then(res=>res.text())
    .then(data=>{

        if(data === "success"){
            alert("Order Placed!\nUse this id to track your Order \nOrder ID: " + order_id);
            
        /* clear after order */
        localStorage.removeItem("buyNowProduct");
         
        showSection("orders");
        loadOrders();
        loadAllOrders();
        }else{
            alert("Error: " + data);
        }

    });
}

function loadOrders(){

fetch("get_orders.php")
.then(res=>res.json())
.then(data=>{

let html = "";

if(data.length === 0){
    html = "<center><p style='font-size: 33px; margin: 80px 600px;'<b><i>No Orders Found</b><p><center>";
}

data.forEach(p=>{
html += `
<div class="product">
<div class="product-media">
<img src="uploads/${p.images}" width="150">
</div>

<h3>${p.pname}</h3>
<h3 class="product-price">₹ ${p.price}</h3>

<p><b>Order ID:</b> ${p.order_id}</p>
<p style="color:orange;"><b>Status:</b> ${p.o_status}</p>

</div>

`;
});

document.getElementById("myOrders").innerHTML = html;

});
}
     


function loadAllOrders(){

fetch("admin_order.php")
.then(res => res.json())
.then(data => {
    console.log(data);
    console.log(table);
    console.log(row);
     
    var table = document.querySelector("#ordersTable tbody");
    var row =" ";
    table.innerHTML = "";
    data.forEach(p => {

        row = `
        <tr>
            <td>${p.order_id}</td>
            <td>${p.user_email}</td>
            <td>${p.uname}</td>
            <td>${p.phone}</td>
            <td>${p.city}</td>
            <td>${p.pname}</td>
            <td>₹ ${p.price}</td>
            <td>
                <select id="status_${p.order_id}">
                    <option ${p.o_status=="Processing"?"selected":""}>Processing</option>
                    <option ${p.o_status=="Confirmed"?"selected":""}>Confirmed</option>
                    <option ${p.o_status=="Shipped"?"selected":""}>Shipped</option>
                    <option ${p.o_status=="Out for Delivery"?"selected":""}>Out for Delivery</option>
                    <option ${p.o_status=="Delivered"?"selected":""}>Delivered</option>
                    <option ${p.o_status=="Not Confirmed"?"selected":""}>Not Confirmed</option>
                </select>
            </td>
            <td>
               <button class="proed-btn" onclick="updateStatus('${p.order_id}', this)">Update</button>
            </td>
            <td>
                <button class="print-btn" onclick="printInvoice('${p.order_id}')">Print</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    });

})
.catch(err => {
    console.error("ERROR:", err);
});
}


function updateStatus(order_id, btn){

    let select = btn.parentElement.previousElementSibling.querySelector("select");

    if(!select){
        alert("Status dropdown not found for order " + order_id);
        return;
    }

    let status = select.value;

    fetch("update_status.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `order_id=${order_id}&status=${encodeURIComponent(status)}`
    })
    .then(res => res.text())
    .then(data => {

        if(data.trim() === "updated"){
            alert("Status Updated");
            loadOrders(); // Reload my orders section automatically
        } else {
            alert("Error: " + data);
        }

    });
}

function printInvoice(order_id){

fetch("admin_order.php")
.then(res=>res.json())
.then(data=>{

let p = data.find(o => o.order_id === order_id);

let win = window.open("", "", "width=800,height=600");

win.document.write(`
<html>
<head>
<title>Invoice</title>
<style>
.print-btn{
     padding: 8px 12px;
    cursor: pointer;
    border-radius: 10px;
    background-color: #0520a4;
    box-shadow:0 0 15px rgba(0,0,0,0.2); 
     color: white;
     border: none;
      text-align: center;
      text-decoration: none; 
      display: inline-block;
       font-size: 16px;
        margin: 4px 2px;
         cursor: pointer;
}
body{font-family:Arial;padding:20px;}
h2{text-align:center;}
table{width:100%;border-collapse:collapse;margin-top:20px;}
td,th{border:1px solid #000;padding:8px;text-align:center;}
</style>
</head>

<body>

<h2>Laxmi Pumps Invoice</h2>

<p><b>Order ID:</b> ${p.order_id}</p>
<p><b>Name:</b> ${p.uname}</p>
<p><b>Email:</b> ${p.user_email}</p>
<p><b>Phone:</b> ${p.phone}</p>

<p><b>Address:</b> ${p.o_address}</p>
<p>${p.city}, ${p.pincode}</p> 
<p>${p.o_state}</p>

<table>
<tr>
<th>Product</th>
<th>Price</th>
</tr>

<tr>
<td>${p.pname}</td>
<td>₹ ${p.price}</td>
</tr>

</table>

<h3>Total: ₹ ${p.price}</h3>
<h3>Thank You</h3>

<br>
<button class="print-btn" onclick="window.print()" >Print</button>

</body>
</html>
`);

win.document.close();

});
}

/* AUTH SWITCH */

/* OTP VARIABLES */
let registerStage = "send";
let otpStage = "send";
let sending = false;
let verifying = false;

/*register switch*/
function showRegister(){
    loginForm.style.display="none";
    forgotForm.style.display="none";
    passwordSection.style.display="none";
    registerForm.style.display="block";
    authTitle.innerText="Register";
}

/*login switch*/
function showLogin(){
    registerForm.style.display="none";
    forgotForm.style.display="none";
    passwordSection.style.display="none";
    loginForm.style.display="block";
    authTitle.innerText="Login";
}
 
/*forgot switch*/
function showforgot(){
    loginForm.style.display="none";
    registerForm.style.display="none";
    passwordSection.style.display="none";
    forgotForm.style.display="block";
    authTitle.innerText="Forgot Password";
}

/*update password switch*/
function showupdatePassword(){
    loginForm.style.display="none";
    registerForm.style.display="none";
    forgotForm.style.display="none";
    passwordSection.style.display="block";
    authTitle.innerText="Update Password";
}

/*show profile before login*/
function showProfile(username){
    const profile = document.getElementById("profileIcon");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    profile.innerHTML = `<i class="fa fa-user-circle"></i> ${username}`;
}

/*show profile after login*/
function showProfile(name){
    let firstLetter = name.charAt(0).toUpperCase();
    let profile = document.getElementById("profileIcon");
    profile.innerText = firstLetter;
    profile.style.display = "flex";
}

/*profile drop down menu*/
function toggleProfileMenu(){
    let menu = document.getElementById("profileDropdown");
    menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}

/*show profile*/
let user = localStorage.getItem("loggedUser");
   if(user){
   showProfile(user);
}

/*window on load */
window.onload = function(){
    
let user = localStorage.getItem("loggedUser");
let role = localStorage.getItem("role");

let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logoutBtn");
let adminSection = document.getElementById("adminSection");
/* HIDE/SHOW LOGIN BUTTONS */
if(user){
        if(loginBtn) loginBtn.style.visibility = "hidden";
        if(logoutBtn) logoutBtn.style.visibility = "hidden";
        loadCart();
        loadOrders();
        loadProducts();
}else{
    if(loginBtn) loginBtn.style.visibility = "visible";
    if(logoutBtn) logoutBtn.style.visibility = "visible";
}

/* ADMIN CONTROL */
if(adminSection){
    if(role === "admin"){
        adminSection.style.display = "block";
    }else{
        adminSection.style.display = "none";
    }
}

}

/* PASSWORD TOGGLE */
function togglePassword(id,icon){
    const field=document.getElementById(id);
    if(field.type==="password"){
        field.type="text";
        icon.classList.replace("fa-eye-slash","fa-eye");
    }else{
        field.type="password";
        icon.classList.replace("fa-eye","fa-eye-slash");
    }
}

/* REGISTER */
function registerUser(e){
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPassword").value;
    const otpInputs = document.querySelectorAll(".reg-otp");

    /* PASSWORD VALIDATION */
    const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if(!pattern.test(pass)){
        alert("Password must be contain:\n\n• Minimum 8 characters\n• At least 1 Capital Letter\n• At least 1 Number\n• At least 1 Special Character");
        return;
    }
    /*OTP AUTO MOVE*/
    otpInputs.forEach((input, index) => {
    
        input.addEventListener("input", () => {
            if(input.value.length === 1 && index < otpInputs.length - 1){
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener("keydown", (e) => {
            if(e.key === "Backspace" && input.value === "" && index > 0){
                otpInputs[index - 1].focus();
            }
        });
    });
    /*wiating coursor on*/
    document.documentElement.style.cursor = "wait";
    /*user action disable*/
    document.body.style.pointerEvents = "none";

    fetch("register.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:`action=send_otp&u_name=${encodeURIComponent(name)}&u_email=${encodeURIComponent(email)}&u_password=${encodeURIComponent(pass)}`
    })

   .then(res=>res.text())
   .then(data=>{
        /*waiting coursor off*/
        document.documentElement.style.cursor = "default";
        /*user action enable*/
        document.body.style.pointerEvents = "auto";
        /*prevent multiple clicks*/
        if(sending) return;
         sending = true;
        /*ENABLE BUTTON */
        document.getElementById("reg-resendBtn").disabled = false;
        document.getElementById("reg-resendBtn").innerText = "Resend OTP";

        data = data.trim();

        console.log("SERVER:", data);

        if(data === "exists"){
            alert("User already exists\ntry another email or login instead");
            return;
        }
        else if(data === "otpsent"){
            alert("OTP sent to your email " + regEmail.value + " successfully");
            /* SHOW OTP SECTION */
            document.getElementById("registerOtpSection").style.display = "block";
            /* START TIMER */
            startregTimer();
            registerStage = "verify";
            sending = false;
            document.getElementById("registerBtn").style.display="none";
            /* AUTO FOCUS */
            setTimeout(()=>{
                document.querySelector(".reg-otp").focus();
            },200);
        }
        else if(data === "Network Error"){
            alert("Network Error in sending OTP To " + regEmail.value);
        }
        else{
            alert("Error: " + data);
        }
    });
}

/* VERIFY REGISTER OTP */
function verifyRegisterOTP(){
    /* PREVENT MULTIPLE CLICKS */
    if(verifying) return;
    verifying = true;
    let otp = "";
    let inputs = document.querySelectorAll(".reg-otp");

    inputs.forEach(i => otp += i.value);

    /* CHECK OTP LENGTH */
    if(otp.length !== 6){
        alert("Enter complete 6-digit OTP");
        verifying = false;
        return;
    }

    fetch("register.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"action=verify_otp&otp="+otp
    })

    .then(res=>res.text())
    .then(data=>{

        data = data.trim();

        console.log("VERIFY:", data);

        /* ALWAYS RESET FLAG */
        verifying = false;

        if(data === "verified"){
            alert("Registration Successful for " + regEmail.value + "\nYou can now login...");
            /* RESET FORM */
            document.getElementById("regName").value="";
            document.getElementById("regEmail").value="";
            document.getElementById("regPassword").value="";
            document.getElementById("registerBtn").style.display="inline-block";  
            registerStage = "send";
            /* RESET UI */
            document.getElementById("registerOtpSection").style.display = "none";
            document.getElementById("reg-resendBtn").style.display = "none";
            showLogin();
        }    
        else if(data === "expired"){
            alert("OTP Expired Please Resend OTP ");
            document.getElementById("reg-resendBtn").style.display = "inline-block";
            inputs.forEach(i => i.value="");
        }
        else if(data === "invalid"){
            clearInterval(interval);
            document.getElementById("reg-timer").innerText = "Invalid OTP";
            alert("Invalid OTP. Please Resend OTP ");
            document.getElementById("reg-resendBtn").style.display = "inline-block";
            inputs.forEach(i => i.value = "");
        }
        else{
            alert("Network Error To Verify OTP ");
        }
    })
}

/* OTP TIMER */
function startregTimer(){
    clearInterval(interval);
    time = 60;
    let rtimer = document.getElementById("reg-timer");
    let resendBtn = document.getElementById("reg-resendBtn");

    resendBtn.style.display = "none";

    interval = setInterval(()=>{
        time--;
        rtimer.innerText = "00:" + (time < 10 ? "0"+time : time);

        if(time <= 0){
            clearInterval(interval);
            rtimer.innerText = "OTP Expired";
            resendBtn.style.display = "inline-block";
        }
    },1000);
}

/* RESEND REGISTER OTP */
function resendRegisterOTP(){
    const name = regName.value;
    const email = regEmail.value;
    const pass = regPassword.value;
    const otpInputs = document.querySelectorAll(".reg-otp");

    /*OTP AUTO MOVE*/
    otpInputs.forEach((input, index) => {
    
        input.addEventListener("input", () => {
            if(input.value.length === 1 && index < otpInputs.length - 1){
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener("keydown", (e) => {
            if(e.key === "Backspace" && input.value === "" && index > 0){
                otpInputs[index - 1].focus();
            }
        });
    });
    /* otp sending entered */
    if(sending) return;
        sending = true;
    /*WAIT CURSOR */
    document.documentElement.style.cursor = "wait";
    /*user action disabled*/
    document.body.style.pointerEvents = "none";
    
    /*DISABLE BUTTON */
    const btn = document.getElementById("reg-resendBtn");
    btn.disabled = true;
    btn.innerText = "Resending...";

    fetch("register.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:`action=send_otp&u_name=${name}&u_email=${email}&u_password=${pass}`
    })

    .then(res=>res.text())
    .then(data=>{

        /*waiting coursor off*/
        document.documentElement.style.cursor = "default";
        /*user action enable*/
        document.body.style.pointerEvents = "auto";  
        /*ENABLE BUTTON */
        btn.disabled = false;
        btn.innerText = "Resend OTP";
        sending = false;

        if(data === "otpsent"){
            alert("OTP Resent To " + email + " successfully");
            /*RESET VERIFY STATE */
            verifying = false;
            document.getElementById("reg-resendBtn").style.display = "none";
            startregTimer();
            /* clear old OTP */
            document.querySelectorAll(".reg-otp").forEach(i => i.value="");
            setTimeout(()=>{
                document.querySelector(".reg-otp").focus();
            },200);
        }
        else{
            alert("Network Error resending OTP To " + email);  
        }
    });
}

/*INPUT NAVIGATION*/
const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");

/* NAME → EMAIL */
regName.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        regEmail.focus();
    }
});

/* EMAIL -> PASSWORD */
regEmail.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        regPassword.focus();
    }
});

/* PASSWORD ->SEND OTP */
regPassword.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
    e.preventDefault();
        /* CHECK IF IN SEND STAGE */
        if(registerStage === "send"){
            registerUser(e);
        }
    }
});

/* VERIFY OTP BUTTON HANDLER */
document.getElementById("registerForm").addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        e.preventDefault();
        /* CHECK IF IN VERIFY STAGE */
        if(registerStage === "verify"){
            verifyRegisterOTP();
        }
    }
});

/* AJAX FOR Email Existence Check */
document.getElementById("regEmail").addEventListener("input", function(){

    let email = this.value;
    let msg = document.getElementById("emailMsg");

    if(email.length < 5){
        msg.innerText = "";
        return;
    }

    fetch("check_email.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"email=" + encodeURIComponent(email)
    })
    .then(res => res.text())
    .then(data => {

        if(data.trim() === "exists"){
            msg.innerText = "Email already registered Try another or login";
            msg.style.color = "red";
        } else {
            msg.innerText = " ";
            msg.style.color = "green";
        }

    });

});
/* LOGIN */
function loginUser(e){
    e.preventDefault();

 /* CAPTCHA VALIDATION */
    let userCaptcha = document.getElementById("captchaInput").value;

    if(userCaptcha !== generatedCaptcha){
        alert("Invalid Captcha ");
        document.getElementById("captchaInput").value = "";
        generateCaptcha(); // refresh captcha
        return;
    }

    const email = loginEmail.value;
    const pass = loginPassword.value;

    fetch("login.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:`u_email=${encodeURIComponent(email)}&u_password=${encodeURIComponent(pass)}`
    })
    
    .then(res => res.text())
    .then(data => {

        console.log("Server Response:", data);
      
let parts = data.trim().split("|");

if(parts[0] === "admin"){

let username = parts[1];
/* store adminname */
localStorage.setItem("loggedUser", username);
/* store role */
localStorage.setItem("role", "admin");
/* show profile icon */
showProfile(username);

/* SHOW ADMIN */
document.getElementById("adminSection").style.display = "block";

alert("Admin Login Successful");
showSection('admin');
/*clear login*/
document.getElementById("loginEmail").value="";
document.getElementById("loginPassword").value="";
document.getElementById("loginBtn").style. visibility= "hidden";
document.getElementById("logoutBtn").style.visibility = "hidden";
loadCart();
}

else if(parts[0] === "user"){

let username = parts[1];

/* store username */
            localStorage.setItem("loggedUser", username);
            /* store role */
            localStorage.setItem("role", "user");
            /* show profile icon */
            showProfile(username);

/* HIDE ADMIN */
document.getElementById("adminSection").style.display = "none";


alert("Login Successful\nWelcome To Laxmi Pump....., " + username + "...!");
showSection('home');
loadCart();
loadOrders();
/*clear login*/
            document.getElementById("loginEmail").value="";
            document.getElementById("loginPassword").value="";
            document.getElementById("loginBtn").style. visibility= "hidden";
            document.getElementById("logoutBtn").style.visibility = "hidden";
}
else if(data === "notregistered"){
            alert("The Email " + email + " is not registered \nPlease register first...");
            showRegister();
        }
        else if(data === "invalid"){
            alert("Incorrect Password for " + email);
        }
        else{
            alert("Login error");
        }
});
}

/* LOGIN INPUT NAVIGATION */
/* LOGIN INPUT NAVIGATION */

/* EMAIL → PASSWORD */
loginEmail.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        loginPassword.focus();
    }
});

/* PASSWORD → CAPTCHA */
loginPassword.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        document.getElementById("captchaInput").focus();
    }
});

/* CAPTCHA → LOGIN */
document.getElementById("captchaInput").addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        loginUser(e); 
    }
});

/*CAPTCHA*/
let generatedCaptcha = "";

/* GENERATE CAPTCHA */
function generateCaptcha(){

    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";

    for(let i = 0; i < 6; i++){
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    generatedCaptcha = captcha;

    document.getElementById("captchaDisplay").value = captcha;
}

/* LOAD CAPTCHA ON PAGE LOAD */
window.addEventListener("load", generateCaptcha);

/* FORGOT PASSWORD */

/* send OTP */
function sendOTP(){
    const email = document.getElementById("forgotEmail").value;
    const otpInputs = document.querySelectorAll(".otp");
    const btn = document.getElementById("sendOtpBtn"); 

    if(email === "") {
        alert("Please enter your registered email First...");
        return;
    }
    
    otpInputs.forEach((input, index) => {
    
        input.addEventListener("input", () => {
            if(input.value.length === 1 && index < otpInputs.length - 1){
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener("keydown", (e) => {
            if(e.key === "Backspace" && input.value === "" && index > 0){
                otpInputs[index - 1].focus();
            }
        });
    });
    /*wiating coursor on*/
    document.documentElement.style.cursor = "wait";
    /*user action disable*/
    document.body.style.pointerEvents = "none";
    /*DISABLE BUTTON */
    btn.disabled = true;
    btn.innerText = "Waiting to Send...";
    btn.style.pointerEvents = "none";

    fetch("forgot.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"action=send_otp&u_email="+encodeURIComponent(email)
    })
    .then(res=>res.text())
    .then(data => {
        /*waiting coursor off*/
        document.documentElement.style.cursor = "default";
        /*user action enable*/
        document.body.style.pointerEvents = "auto";
        /*otp sending entered */
        if(sending) return;
         sending = true;
        /*ENABLE BUTTON */
        btn.disabled = false;
        btn.innerText = "Send OTP";

        data = data.trim();
        console.log("SERVER:", data);

        if(data === "otpsent"){
            alert("OTP sent to your email : " + email + " successfully");
            otpStage = "verify";
            document.getElementById("otpSection").style.display="block";
            startTimer();
            /*otp seending is off*/
            sending = false;
            /* AUTO FOCUS FIRST OTP */
            document.querySelector(".otp").focus();
            /*send otp button hide*/
            document.getElementById("sendOtpBtn").style.display="none"; 
        }
        else if(data === "notfound"){
            alert("The Email " + email + " is not registered \nPlease register first...");
            showRegister();
            document.getElementById("forgotEmail").value="";
        }
        else{
            alert("Network Error in sending OTP To " + email);
       }
    });
}

/* verify OTP */
function verifyOTP(){
const email = document.getElementById("forgotEmail").value;
    let inputs = document.querySelectorAll(".otp");
    let otp = "";

    inputs.forEach(i => otp += i.value);

    /* CHECK OTP LENGTH */
    if(otp.length !== 6){
        alert("Enter complete 6-digit OTP");
        verifying = false;
        return;
    }

    fetch("forgot.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"action=verify_otp&otp="+otp
   })

    .then(res=>res.text())
    .then(data=>{

        
        data = data.trim();
        console.log("SERVER:", data);

        /*otp verifying entered */
        if(verifying) return;
        verifying = true;
        if(data ==="verified"){
            alert("OTP Verified Successfully. \nYou can now update your password.");
            showupdatePassword();
            document.getElementById("otpSection").style.display="none";
            document.getElementById("resendBtn").style.display = "none";
            /*otp verifying is off*/
            verifying = false;
            /* clear OTP  */
            inputs.forEach(i => i.value = "");
            /* clear forgot email */
            document.getElementById("forgotEmail").value="";
        }
        else if(data ==="expired"){
            alert("OTP Expired. \nPlease resend OTP To " + email);
            document.getElementById("resendBtn").style.display = "inline-block";
            inputs.forEach(i => i.value = "");
        }
        else if(data === "invalid"){
            clearInterval(interval);
            document.getElementById("timer").innerText = "Invalid OTP";
            alert("Invalid OTP. \nPlease resend OTP To " + email);
            document.getElementById("resendBtn").style.display = "inline-block";
            inputs.forEach(i => i.value = "");
        }
        else{
            alert("Error To verify OTP");
        }
    });
}

/* ENTER KEY HANDLER */
const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        e.preventDefault();
        let active = document.activeElement;
        /* EMAIL FIELD → SEND OTP */
        if(active.id === "forgotEmail"){
            sendOTP();
        }
        /* OTP FIELD -> VERIFY OTP */
        else if(active.classList.contains("otp")){
            verifyOTP();
        }
    }
});

/* OTP TIMER */
let time = 60;
let interval;
function startTimer(){
    clearInterval(interval);
    time = 60;
    let timer = document.getElementById("timer");
    let resendBtn = document.getElementById("resendBtn");

    resendBtn.style.display = "none";

    interval = setInterval(()=>{
        time--;
        timer.innerText = "00:" + (time < 10 ? "0"+time : time);

        if(time <= 0){
            clearInterval(interval);
            timer.innerText = "OTP Expired";
            resendBtn.style.display = "inline-block";
        }
    },1000);
}

/* RESEND OTP */
function resendOTP(){
    const email = document.getElementById("forgotEmail").value;
    const btn = document.getElementById("resendBtn");
/*OTP AUTO MOVE*/
    document.addEventListener("DOMContentLoaded", () => {
        const otpInputs = document.querySelectorAll(".otp");

        otpInputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                if(input.value.length === 1 && index < otpInputs.length - 1){
                    otpInputs[index + 1].focus();
                }
            });
            input.addEventListener("keydown", (e) => {
                if(e.key === "Backspace" && input.value === "" && index > 0){
                    otpInputs[index - 1].focus();
                }
            });
        });
   });
/* otp sending entered */
    if(sending) return;
        sending = true;
    /*WAIT CURSOR */
    document.documentElement.style.cursor = "wait";
    /*user action disabled*/
    document.body.style.pointerEvents = "none";
    /*DISABLE BUTTON */
    btn.disabled = true;
    btn.innerText = "Resending...";

    fetch("forgot.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"action=send_otp&u_email="+encodeURIComponent(email)
    })

    .then(res=>res.text())
    .then(data => {

        data = data.trim();
        console.log("SERVER:", data);
        /*wait cursor off*/
        document.documentElement.style.cursor = "default";
        /*user action enable*/
        document.body.style.pointerEvents = "auto";
        /*ENABLE BUTTON */
        btn.disabled = false;
        btn.innerText = "Resend OTP";
        sending = false;

        if(data === "otpsent"){
            alert("OTP Resent To " + email + " successfully");
            /*RESET VERIFY STATE */
            verifying = false;
            /*CLEAR OLD OTP */
            let inputs = document.querySelectorAll(".otp");
            inputs.forEach(i => i.value = "");
            /*RESTART TIMER */
            startTimer();
            /* hide resend button */
            btn.style.display = "none";
            /*AUTO FOCUS */
            setTimeout(()=>{
                if(inputs.length > 0){
                    inputs[0].focus();
                }
            },200);
        }
        else{
            alert("Network Error in resending OTP To " + email);
        }
    })
    .catch(()=>{

        /* restore even on error */
        document.documentElement.style.cursor = "default";
        document.body.style.pointerEvents = "auto";
        btn.disabled = false;
        btn.innerText = "Resend OTP";
        sending = false;
        alert("Network error");
    });
}

/* update password */
function updatePassword(e){
    e.preventDefault();
    const pass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    /* validation */
    const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if(!pattern.test(pass)){
        alert("Password must be contain:\n\n• Minimum 8 characters\n• At least 1 Capital Letter\n• At least 1 Number\n• At least 1 Special Character");
        return;
   }

    if(pass !== confirm){
        alert("Passwords do not match ");
        return;
    }

    fetch("forgot.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"action=update_password&u_password="+encodeURIComponent(pass)
    })

    .then(res=>res.text())
    .then(data=>{

        if(data==="updated"){
            alert("Your Password updated successfully");
            showLogin();
            /* clear forgot form*/
            document.getElementById("newPassword").value="";
            document.getElementById("confirmPassword").value="";
        }
        else{
            alert("Error updating password");
        }
    });
}

/* LOGOUT */
function logout(){

    let username = localStorage.getItem("loggedUser");

    let confirmLogout = confirm("Are you sure you want to logout from your account? " + username);

    if(confirmLogout){

        // 🔥 CALL PHP TO DESTROY SESSION
        fetch("logout.php")
        .then(res => res.text())
        .then(data => {

            // clear frontend
            localStorage.removeItem("loggedUser");
            localStorage.removeItem("role");

            alert("Thank you " + username + " for being with us.\nVisit again!");
            
            document.getElementById("loginBtn").style. visibility= "visible";
            document.getElementById("logoutBtn").style.visibility = "visible";
            // hide admin section
            let adminSection = document.getElementById("adminSection");
            if(adminSection){
                adminSection.style.display = "none";
            }

            // reload page
            location.reload();
        });

    } 
    else {
        /* user clicked cancel */
        return;
    }
}

/*sign out */
function signOut(){
    let confirmSignOut = confirm("Are you sure you want to sign out and delete your account? " + localStorage.getItem("loggedUser"));

    if(!confirmSignOut){
        return;
    }

    let user = localStorage.getItem("loggedUser");

    fetch("delete_user.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:`u_name=${encodeURIComponent(user)}`
    })

    .then(res => res.text())
    .then(data => {

        if(data === "deleted"){
            alert("Your account " + localStorage.getItem("loggedUser") + " has been deleted");
            localStorage.removeItem("loggedUser");
            alert("Thank you.... " + localStorage.getItem("loggedUser") + ", for being with us. \nVisit again!");
            document.getElementById("loginBtn").style. visibility= "visible";
            document.getElementById("logoutBtn").style.visibility = "visible";
            
            // reload page
            location.reload();
        }
        else{
            alert("Error deleting account");
        }
    });
}

loadProducts();
loadCart();
loadOrders();
loadAllOrders();