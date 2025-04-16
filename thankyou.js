document.addEventListener("DOMContentLoaded", function () {
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    let formattedDate = deliveryDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("deliveryDate").textContent = formattedDate;
});
