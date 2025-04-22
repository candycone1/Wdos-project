
document.addEventListener("DOMContentLoaded", function () {
  loadCartPage();
});

function loadCartPage() {
  displayCart();
  setupCartActions();
  goback();
}


function goback(){
  const backbtn = document.getElementById("backbtn")
  if (backbtn){
    backbtn.addEventListener("click", function()
    {
      window.location.href="shop.html";

    })
    
  }
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  let total = 0;

  cartTable.innerHTML = "";

  cart.forEach(function (item, index) {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}</td>
      <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantityInput"></td>
      
      <td>${subtotal.toLocaleString()}</td>
    `;
    cartTable.appendChild(row);
  });

  totalPrice.textContent = total.toLocaleString();
  attachQuantityListeners();
}

function attachQuantityListeners() {
  const inputs = document.querySelectorAll(".quantityInput");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      const index = this.getAttribute("data-index");
      const value = parseInt(this.value);
      if (value > 0) {
        cart[index].quantity = value;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      }
    });
  });
}

function setupCartActions() {
  document.getElementById("checkoutBtn").addEventListener("click", proceedToCheckout);
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);
  document.getElementById("saveFavBtn").addEventListener("click", saveToFavourites);
  document.getElementById("applyFavBtn").addEventListener("click", applyFavourites);
}

function proceedToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before proceeding to checkout.");
    return;
  }
  localStorage.setItem("currentOrder", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
}

function saveToFavourites() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  localStorage.setItem("favouriteCart", JSON.stringify(cart));
  alert("Saved to favourites.");
}

function applyFavourites() {
  const fav = JSON.parse(localStorage.getItem("favouriteCart"));
  if (fav) {
    localStorage.setItem("cart", JSON.stringify(fav));
    displayCart();
    alert("Favourite cart applied.");
  } else {
    alert("No favourite cart found.");
  }
}
