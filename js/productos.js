const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidadTotal = document.getElementById("cantidadTotal");

const precioTotal = document.getElementById("precioTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

function mostrarProductosEnDOM(productos) {
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src=${producto.img} alt="">
      <h3>${producto.nombre}</h3>
      <p>${producto.desc}</p>
      <p class="precioProducto">Precio:$ ${producto.precio}</p>
      <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
      `;
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
}

mostrarProductosEnDOM(productos);

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.find((prod) => prod.id === prodId);
    prod.cantidad++;
  } else {
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push({
      ...item,
      cantidad: 1,
    });
  }

  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);

  actualizarCarrito();
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  // Agrupar productos por id y sumar cantidades
  const carritoAgrupado = carrito.reduce((acc, prod) => {
    const index = acc.findIndex((p) => p.id === prod.id);
    if (index !== -1) {
      acc[index].cantidad += prod.cantidad;
    } else {
      acc.push({ ...prod });
    }
    return acc;
  }, []);

  // Mostrar los productos agrupados en el carrito
  carritoAgrupado.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;
    contenedorCarrito.appendChild(div);
  });

  // Calcular el precio total
  const precioTotalCarrito = carrito.reduce((acc, prod) => {
    return acc + prod.precio * prod.cantidad;
  }, 0);

  
  contadorCarrito.innerText = carrito.length 
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
  localStorage.setItem("carrito", JSON.stringify(carrito));
};



const realizarCompraButton = document.getElementById('realizar-compra');
realizarCompraButton.addEventListener('click', () => {
  // aca va el codigo que procesa la compra
  
});

const botonCompra = document.getElementById("realizar-compra");

botonCompra.addEventListener("click", function() {
  const total = document.getElementById("precioTotal").textContent;
  alert(`El total de su compra es de $${total}. ¡Gracias por su compra!`);
});

// Obtener el elemento <select> y agregar un evento "change"
const selectCategoria = document.getElementById("categoria");
selectCategoria.addEventListener("change", filtrarProductos);

// Función para filtrar los productos según la categoría seleccionada
function filtrarProductos() {
  const categoriaSeleccionada = selectCategoria.value;
  let productosFiltrados = [];

  // Si la categoría seleccionada es "Todos", mostrar todos los productos
  if (categoriaSeleccionada === "all") {
    productosFiltrados = productos;
  } else {
    // Filtrar la lista de productos por categoría
    productosFiltrados = productos.filter((prod) => prod.categoria === categoriaSeleccionada);
  }

  // Limpiar el contenedor de productos existente
  contenedorProductos.innerHTML = "";

  // Mostrar los productos filtrados en el DOM
  mostrarProductosEnDOM(productosFiltrados);
}

















