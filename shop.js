
document.addEventListener("DOMContentLoaded", function () {
  setupCartButtons(); 
  setupHamburgerMenu(); 
  setupCart();
});

function setupCart(){
  const cart_btn = document.getElementById("cart-btn");
  if (cart_btn){
    cart_btn.addEventListener("click", function (){
    window.location.href = "cart.html";
  });

}
}

function setupHamburgerMenu() {
  const button = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");

  if (button && navList) {
    button.addEventListener("click", function () {
      navList.classList.toggle("show");
    });
  }
}


function setupCartButtons() {
  const addToCartButtons = document.querySelectorAll(".addToCart-btn");
  const buyNowButtons = document.querySelectorAll(".buyNow-btn");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", handleAddToCart);
  });

  buyNowButtons.forEach(function (button) {
    button.addEventListener("click", handleBuyNow);
  });
}

function handleAddToCart(event) {
  const name = event.target.getAttribute("data-name");
  const price = parseFloat(event.target.getAttribute("data-price").replace(/,/g, ""));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  showBannerMessage(`${name} added to cart!`);
}

function handleBuyNow(event) {
  const name = event.target.getAttribute("data-name");
  const price = parseFloat(event.target.getAttribute("data-price").replace(/,/g, ""));
  const order = [{ name: name, price: price, quantity: 1 }];

  localStorage.setItem("currentOrder", JSON.stringify(order));
  window.location.href = "checkout.html";
}

function showBannerMessage(message) {
  const container = document.getElementById("notificationContainer");
  const banner = document.createElement("div");
  banner.className = "notification";
  banner.textContent = message;

  container.appendChild(banner);


  setTimeout(() => {
    banner.style.opacity = "0";
    banner.style.transform = "translateY(-10px)";

    
    setTimeout(() => banner.remove(), 300);
  }, 2000);
}