document.addEventListener("DOMContentLoaded",getname)
Gobaack()
    function getname(){
        const name = localStorage.getItem("username");
        const date = localStorage.getItem("deliveryDate");


        if (name && date ){
            document.getElementById("username").textContent= name;
            document.getElementById("deliveryDate").textContent=date;
        }
    }

    function Gobaack()
    {
        const btn = document.getElementById("Shoppage-btn");
        btn.addEventListener("click", function (){
            window.location.href="shop.html";
        })
    }