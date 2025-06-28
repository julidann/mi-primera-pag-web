"use strict";

let menu= document.querySelector("#menuToggle")
    menu.addEventListener("click", ()=> {
    let nav= document.querySelector("#navLinks")
        nav.classList.toggle("active");
});