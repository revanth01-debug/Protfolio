// -------------------- Login & Role Redirection --------------------
function loginUser(email, role) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);

    if(role === "customer") window.location.href = "home_customer.html";
    else if(role === "restaurant") window.location.href = "home_restaurant.html";
    else if(role === "delivery") window.location.href = "home_delivery.html";
}

// -------------------- Navbar Profile --------------------
function loadNavbar(navId = "navbar") {
    const navArea = document.getElementById(navId);
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");
    if(email) {
        const profileFile = role === "customer" ? "profile_customer.html" : role === "restaurant" ? "profile_restaurant.html" : "profile_delivery.html";
        navArea.innerHTML = `<a href="${profileFile}">
        <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" class="profile-icon" title="Profile">
        </a>`;
    } else {
        navArea.innerHTML = `<a href="login.html" class="login-btn">Login</a>`;
    }
}

// -------------------- Logout --------------------
function logoutUser() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
}

// -------------------- Simulated Orders & Cart --------------------
function getOrders() {
    return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

function placeOrder(order) {
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
}

// -------------------- Profile Update --------------------
function loadProfile() {
    const email = localStorage.getItem("userEmail");
    document.getElementById("profileEmail").innerText = email || "-";
}

function changePassword() {
    alert("Password changed successfully (simulation).");
}
