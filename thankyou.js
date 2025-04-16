document.addEventListener("DOMContentLoaded",getname)

    function getname(){
        const name = localStorage.getItem("username");
        const date = localStorage.getItem("deliveryDate");


        if (name && date ){
            document.getElementById("username").textContent= name;
            document.getElementById("deliveryDate").textContent=date;
        }
    }

