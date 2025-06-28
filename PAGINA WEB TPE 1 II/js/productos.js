"use strict";
document.addEventListener("DOMContentLoaded", ()=>{
  mostrarTabla();
  cargarProductos();
});

const BASE_URL = "https://68572c0c21f5d3463e549e99.mockapi.io/api/v1/productos";

let totalProductos= [];
let productosPaginados = [];
let productosFiltrados= [];

let tbody = document.querySelector("#tbodyProductos");
let mensaje = document.querySelector("#mje-paginacion");
let IDeditar = false;
let mostrandoFiltro= false;
let paginaActual = 1;
const LIMITE = 5;

let form = document.querySelector("#formProducto");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
          if (IDeditar) {
            editarProducto(form, IDeditar);
          } else {
            agregarProducto(form);
          }
          if (mostrandoFiltro) {
            mostrarFiltrados();  
          } else {
            mostrarTabla();      
          }
});
let btnGuardar = form.querySelector("button");
    btnGuardar.type = "submit";
let btnSiguiente = document.querySelector("#btnSiguiente");
    btnSiguiente.addEventListener("click", () => {
    paginaActual++;
    mostrarTabla();
});
let btnAnterior =document.querySelector("#btnAnterior")
    btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarTabla();
    }
});
let formFiltro = document.querySelector("#formFiltro");
formFiltro.addEventListener("submit", (e) => {
  e.preventDefault();
  mostrarFiltrados();
});
let btnLimpiarFiltro=document.querySelector("#btnLimpiarFiltros");
    btnLimpiarFiltro.addEventListener("click", () => {
      mostrandoFiltro = false;
      paginaActual = 1;
      mostrarTabla();
  });

async function cargarProductos() {
  try {
    let response = await fetch(BASE_URL);
    if (response.ok) {
      totalProductos = await response.json();
    }
  } catch (error) {
  }
};

function cargarFormulario(producto) {
  document.querySelector("#nombre").value = producto.nombre;
  document.querySelector("#descripcion").value = producto.descripcion;
  document.querySelector("#precio").value = producto.precio;
  document.querySelector("#categoria").value = producto.categoria;
  document.querySelector("#stock").value = producto.stock;
};

function generarTabla(productos) {
  let tbody = document.querySelector("#tbodyProductos");
      tbody.innerHTML="";

  productos.forEach((producto) => {
    let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.classList.add("btnAccion");
        btnEliminar.addEventListener("click", () => {
          eliminarProducto(producto.id);
    });

    let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.classList.add("btnAccion");
        btnEditar.addEventListener("click", () => {
          IDeditar = producto.id;
          btnGuardar.innerHTML = "Guardar";
          location.href = "#divProductos";
          cargarFormulario(producto);
          
    });

    let tdBtn = document.createElement("td");
        tdBtn.classList.add("td-btn");
        tdBtn.appendChild(btnEliminar);
        tdBtn.appendChild(btnEditar);

    let trBody = document.createElement("tr");

    let tdNombre = document.createElement("td");
        tdNombre.innerHTML = producto.nombre;
    let tdDescripcion = document.createElement("td");
        tdDescripcion.innerHTML = producto.descripcion;
    let tdPrecio = document.createElement("td");
        tdPrecio.innerHTML = producto.precio;
    let tdCategoria = document.createElement("td");
        tdCategoria.innerHTML = producto.categoria;
    let tdStock = document.createElement("td");
        tdStock.innerHTML = producto.stock;
            if (producto.stock === "Agotado") {
              tdStock.classList.add("gris");
            }
        trBody.appendChild(tdNombre);
        trBody.appendChild(tdDescripcion);
        trBody.appendChild(tdPrecio);
        trBody.appendChild(tdCategoria);
        trBody.appendChild(tdStock);
        trBody.appendChild(tdBtn);
        tbody.appendChild(trBody);
  });
};

async function mostrarTabla() {
  mensaje.innerHTML = "Loading ... ⟳";
  btnSiguiente.disabled = false;
  let url = new URL(BASE_URL);
      url.searchParams.append("page", paginaActual);
      url.searchParams.append("limit", LIMITE);
  try {
    let response = await fetch(url);
    if (response.ok) {
      productosPaginados = await response.json();
      generarTabla(productosPaginados);
      mensaje.innerHTML="";

      btnAnterior.disabled = (paginaActual === 1);
          if (btnAnterior.disabled){
            btnAnterior.classList.add("btnNone")
          }else{
            btnAnterior.classList.remove("btnNone")
          }

      btnSiguiente.disabled = (productosPaginados.length < LIMITE);
          if (btnSiguiente.disabled){
              btnSiguiente.classList.add("btnNone");
          }else {
              btnSiguiente.classList.remove("btnNone");
          }
    } else {
      mensaje.innerHTML = "Error - Failed URL!";
    }
  } catch (error) {
    mensaje.innerHTML = "Connection error";
  }
};

function datosForm(form) {
  let data = new FormData(form);
  let producto = {
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      precio: Number(data.get("precio")),
      categoria: data.get("categoria"),
      stock: data.get("stock"),
    };
  return producto;
};

async function agregarProducto(form) {
  let producto = datosForm(form);
  try {
    let response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error(`Error al agregar el producto`);
    }
    mostrarTabla();
    form.reset();
  } catch (error) {
    mensaje.innerHTML = "Error al agregar";
  }
};

async function eliminarProducto(id) {
  try {
    let response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    let eliminado = false;
    for (let i = 0; i < totalProductos.length && !eliminado; i++) {
    if (totalProductos[i].id == id) {
    totalProductos.splice(i, 1);
    eliminado = true; 
    } 
  }
      if (mostrandoFiltro) {
      mostrarFiltrados();
      generarTabla(productosFiltrados);
    } else {
      mostrarTabla();
    }
    }catch (error) {
    mensaje.innerHTML = "Error al eliminar";
  }
};

async function editarProducto(form, id) {
  let productoEditado = datosForm(form);
  try {
    let response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productoEditado),
    });

    if (!response.ok) {
      throw new Error(`Error al editar el producto: ${id}`);
    }
       totalProductos.forEach((producto, i) => {
      if (producto.id === id) {
        totalProductos[i] = productoEditado;
      }
    });
    
    if (mostrandoFiltro) {
      mostrarFiltrados();
      generarTabla(productosFiltrados);
    } else {
      mostrarTabla();
    }
    form.reset();
    IDeditar = false;
    btnGuardar.innerHTML = "Agregar";
  } catch (error) {
    mensaje.innerHTML = "Error al editar";
  }
};

function mostrarFiltrados (){
  let input = document.querySelector("#filtroNombre").value.toLowerCase();
  let categoria = document.querySelector("#filtroCategoria").value;
  let stock = document.querySelector("#filtroStock").value;

  productosFiltrados = totalProductos.filter((producto) => {
    let coincideInput = producto.descripcion.toLowerCase().includes(input);
    let coincideCategoria = (!categoria || producto.categoria === categoria);
    let coincideStock = (!stock || producto.stock === stock);

    return coincideInput && coincideCategoria && coincideStock;
  });
      paginaActual=1;
      mostrandoFiltro= true;
      btnSiguiente.classList.add("btnNone");
      btnAnterior.classList.add("btnNone");
      generarTabla(productosFiltrados);
};
