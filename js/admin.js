import { productos_stock } from "./stock";
  console.log (productos_stock);
  
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
  localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}
function obtenerAlmacenamientoLocal(llave) {
  const datos = JSON.parse(localStorage.getItem(llave));
  return datos;
}

let productos_stock = obtenerAlmacenamientoLocal("productos_stock") || [];
let mensaje = document.getElementById("mensaje");

//Añadir un producto
const añadirProducto = document.getElementById("productoAñadir");
const añadirValor = document.getElementById("valorAñadir");
const añadirExistencia = document.getElementById("existenciaAñadir");
const añadirImagen = document.getElementById("ImagenAñadir");

document
  .getElementById("botonAñadir")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let productoAñadir = añadirProducto.value;
    let valorAñadir = añadirValor.value;
    let existenciaAñadir = añadirExistencia.value;
    let imagenAñadir = añadirImagen.value;

    let condicion_cumplida = true;

    if (
      productoAñadir == "" ||
      valorAñadir == "" ||
      existenciaAñadir == "" ||
      imagenAñadir == ""
    ) {
      mensaje.classList.add("llenarCampos");
      setTimeout(() => {
        mensaje.classList.remove("llenarCampos");
      }, 2500);
      condicion_cumplida = false;
    } else {
      for (let i = 0; i < productos_stock.length; i++) {
        if (productos_stock[i].nombre == productoAñadir) {
          mensaje.classList.add("repetidoError");
          setTimeout(() => {
            mensaje.classList.remove("repetidoError");
          }, 2500);
          condicion_cumplida = false;
        }
      }
    }

    if (condicion_cumplida == true) {
      productos_stock.push({
        nombre: productoAñadir,
        valor: valorAñadir,
        existencia: existenciaAñadir,
        urlImagen: imagenAñadir,
      });
      mensaje.classList.add("realizado");
      setTimeout(() => {
        mensaje.classList.remove("repetidoError");
        window.location.reload();
      }, 1500);
    }
    guardarAlmacenamientoLocal("productos", productos_stock);
  });

// Editar
const productoEd = document.getElementById("productoEditar");
const atributoEd = document.getElementById("atributoEditar");
const nuevoAtributoEd = document.getElementById("nuevoAtributo");

document
  .getElementById("botonEditar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let productoEditar = productoEd.value;
    let atributoEditar = atributoEd.value;
    let nuevoAtributo = nuevoAtributoEd.value;
    let condicion_cumplida = false;
    if (productoEditar == "" || atributoEditar == "" || nuevoAtributo == "") {
      mensaje.classList.add("llenarCampos");
      setTimeout(() => {
        mensaje.classList.remove("llenarCampos");
      }, 2500);
    } else {
      for (let i = 0; i < productos_stock.length; i++) {
        if (productos_stock[i].nombre == productoEditar) {
          productos_stock[i][atributoEditar] = nuevoAtributo;
          condicion_cumplida = true;
        }
      }
      if (condicion_cumplida == true) {
        mensaje.classList.add("realizado");
        setTimeout(() => {
          mensaje.classList.remove("realizado");
          window.location.reload();
        }, 1500);
      } else {
        mensaje.classList.add("noExisteError");
        setTimeout(() => {
          mensaje.classList.remove("noExsiteError");
        }, 2500);
      }
      guardarAlmacenamientoLocal("productos", productos_stock);
    }
  });

// Eliminar
const productoE = document.getElementById("productoEliminar");

document
  .getElementById("botonEliminar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let productoEliminar = productoE.value;
    let condicion_cumplida = false;

    for (let i = 0; i < productos.length; i++) {
      if (productos_stock[i].nombre == productoEliminar) {
        productos_stock.splice(i, 1);
        condicion_cumplida = true;
      }
    }

    if (condicion_cumplida == false) {
      mensaje.classList.add("noExsiteError");
      setTimeout(() => {
        mensaje.classList.remove("noExsiteError");
      }, 2500);
    } else {
      mensaje.classList.add("realizado");
      setTimeout(() => {
        mensaje.classList.remove("realizado");
        window.location.reload();
      }, 1500);
    }
    guardarAlmacenamientoLocal("productos", productos_stock);
  });

// mostrar productos
window.addEventListener("load", () => {
  const productoEd = document.getElementById("productoEditar");
  const productoEl = document.getElementById("productoEliminar");
  for (let i = 0; i < productos_stock.length; i++) {
    productoEd.innerHTML += `<option>${productos_stock[i].nombre}</option>`;
    productoEl.innerHTML += `<option>${productos_stock[i].nombre}</option>`;
  }
  Object.keys(productos_stock[0]).forEach((element) => {
    atributoEd.innerHTML += `<option>${element}</option>`;
  });

  let mostraProductos = document.getElementById("mostrarProductos");
  mostraProductos.innerHTML = "";
  for (let i = 0; i < productos_stock.length; i++) {
    mostraProductos.innerHTML += `<div class="contenedorProductos">
        <img src="${productos_stock[i].urlImagen}">
        <div class="informacion"><p>${productos_stock[i].nombre}</p>
        <p class="precio"><span>Precio: ${productos_stock[i].valor}$</span>
        </p> Existencia: ${productos_stock[i].existencia}<p></p></div></div>`;
  }
  
});
