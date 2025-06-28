"use strict";

let verMas = [
    { 
        boton: "#verMasAdultosAct", 
        seccion: "#sectionActividadAdultos" },
    { 
        boton: "#verMasNiñosAct", 
        seccion: "#sectionActividadNiños" },
    { 
        boton: "#verMasCompAct", 
        seccion: "#sectionActividadComp" },
    { 
        boton: "#verMasAdultosHs", 
        seccion: "#sectionHorariosAdultos" },
    { 
        boton: "#verMasNiñosHs", 
        seccion: "#sectionHorariosNiños" },
    { 
        boton: "#verMasCompHs", 
        seccion: "#sectionHorariosComp" }
];

function mostrarOcultar(seccion, boton) {
    let div = document.querySelector(seccion);
    let btn = document.querySelector(boton);
    if (div.classList.contains("ocultar")) {
        div.classList.remove("ocultar");
        div.classList.add("mostrar");
        btn.innerHTML = "Ver menos";
    } else {
        div.classList.remove("mostrar");
        div.classList.add("ocultar");
        btn.innerHTML = "Ver más";
    }
}

for (let i = 0; i < verMas.length; i++) {
    let arreglo = verMas[i];
    let btnVerMas = document.querySelector(arreglo.boton);
    if (btnVerMas) {
        let seccion = arreglo.seccion;
        let boton = arreglo.boton;
        btnVerMas.addEventListener("click", ()=>{
            mostrarOcultar(seccion,boton);
        });
    }
};
