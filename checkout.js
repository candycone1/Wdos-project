
document.addEventListener("DOMContentLoaded", function () {
  showOrderSummary();
  setupCheckoutForm();
});

function showOrderSummary() {
  const order = JSON.parse(localStorage.getItem("currentOrder")) || [];
  const tbody = document.querySelector("#orderTable tbody");
  const orderTotal = document.getElementById("orderTotal");

  tbody.innerHTML = "";
  let total = 0;

  order.forEach(function (item) {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>${item.quantity}</td>
      <td>${subtotal.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });

  orderTotal.textContent = total.toLocaleString();
}

function setupCheckoutForm() {
  document.getElementById("checkoutForm").addEventListener("submit", handlePayment);
}

function handlePayment(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const card = document.getElementById("card").value;
  const expiry = document.getElementById("expiry").value;

  if (name && email && address && city && card && expiry) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const formattedDate = deliveryDate.toDateString();

    localStorage.removeItem("currentOrder");
    const url = `thankyou.html?name=${encodeURIComponent(name)}&delivery=${encodeURIComponent(formattedDate)}`;
    window.location.href = url;
  } else {
    alert("Please fill in all fields.");
  }
}
