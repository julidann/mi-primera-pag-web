"use strict";

let tema= document.querySelector("#btnClaroOscuro")
    tema.addEventListener("click", claroOscuro);

function claroOscuro(){
  let btn = document.querySelector("#btnClaroOscuro");
  let main = document.querySelector("main");
  let stock = document.querySelector("td.gris");
  let tablaProductos= document.querySelector(".tablaProductos");
      main.classList.toggle("oscuro");
      tablaProductos.classList.toggle("oscuro");
      stock.classList.toggle("oscuro");
  
    if (main.classList.contains("oscuro")) {
      btn.innerHTML = "🌙"; 
    } else {
      btn.innerHTML = "🔆";  
    }
  }

