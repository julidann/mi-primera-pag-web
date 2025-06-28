"use strict";
let animales=[
    { 
        nombre: "perro", 
        img: "img/perro.png" 
    },
    { 
        nombre: "gato", 
        img: "img/gato.png" 
    },
    { 
        nombre: "caballo", 
        img: "img/caballo.png" 
    },
    { 
        nombre: "mono", 
        img: "img/mono.png" },
    { 
        nombre: "delfin", 
        img: "img/delfin.png" }
];

let imgAnimal= document.querySelector("#imgAleatoria");
let nombreAnimal= document.querySelector("#nombreAnimal");
let respuesta= document.querySelector("#respuesta");
let respuestaCorrecta= "";

imagenAleatoria();

let btn= document.querySelector("#btnEnviarForm");
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        let nombre= nombreAnimal.value.toLowerCase();
        if (nombre===respuestaCorrecta){
            respuesta=document.querySelector("#respuesta").innerHTML="Formulario enviado. En breve nos estaremos comunicando con Ud.";
        }else{
        respuesta=document.querySelector("#respuesta").innerHTML="Incorrecto. Por favor intente de nuevo ⭯";
        }
    });

function imagenAleatoria(){
    let i= Math.floor(Math.random() * 5);
    let animal= animales[i];
    imgAnimal.src=animal.img;
    respuestaCorrecta= animal.nombre;
};

