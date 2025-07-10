let login = document.querySelector("#login");
let haslo = document.querySelector("#haslo");
let zlogin = document.querySelector("#zlogin");
let zhaslo = document.querySelector("#zhaslo");

let check = document.querySelector("#show-password");

let zaloguj = document.querySelector("#zaloguj");

check.addEventListener("click", (e)=>{
    if(check.checked == true){
        haslo.setAttribute("type", "text");
    }
    else{
        haslo.setAttribute("type", "password")
    }
});


zaloguj.addEventListener("click", (e)=>{
    if(login.value == "DripSMPadmin"){
        if(haslo.value == "A9#tX7$pQ2"){
            window.location.href = "ADM-options.html";
        }
        else{
            haslo.value = "";
            zhaslo.style.display = "block";
            zlogin.style.display = "none";
        }
    }
    else{
        login.value = "";
        zlogin.style.display = "block";
        haslo.value = "";
        zhaslo.style.display = "none";
    }
});