// Obtener los elementos HTML necesarios
const quantityButtons = document.querySelectorAll('.quantity-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');
const totalText = document.querySelector('.total-text');
const totalPrice = document.querySelector('.total-price');
const finalizarBtn = document.querySelector('#finalizar-btn');

// Crear un objeto para almacenar los productos del carrito
const cart = {};

// Agregar un evento de click a los botones de cantidad (- y +)
quantityButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.parentNode.parentNode; // Obtener la fila del producto
    const productId = parent.id; // Obtener el ID del producto
    const quantityInput = parent.querySelector('.quantity-input'); // Obtener el input de cantidad
    const currentQuantity = parseInt(quantityInput.value); // Obtener la cantidad actual del producto
    const price = parseFloat(parent.querySelector('.product-price').textContent.slice(1)); // Obtener el precio del producto

    // Actualizar la cantidad del producto en el carrito
    if (button.classList.contains('plus')) {
      quantityInput.value = currentQuantity + 1;
      if (cart[productId]) {
        cart[productId].quantity++;
      } else {
        cart[productId] = {
          name: parent.querySelector('.product-name').textContent,
          price: price,
          quantity: 1
        };
      }
    } else if (button.classList.contains('minus') && currentQuantity > 0) {
      quantityInput.value = currentQuantity - 1;
      cart[productId].quantity--;
      if (cart[productId].quantity === 0) {
        delete cart[productId];
      }
    }

    // Calcular y actualizar el precio total del carrito
    let total = 0;
    for (const item in cart) {
      total += cart[item].price * cart[item].quantity;
    }
    totalPrice.textContent = '$' + total.toFixed(2);
    
    // Agregar o eliminar la clase 'positive' del elemento de texto del precio total
    if (total > 0) {
      totalPrice.classList.add('positive');
    } else {
      totalPrice.classList.remove('positive');
    }
  });
});


// Agregar un evento de click al botón de eliminar
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.parentNode.parentNode; // Obtener la fila del producto
    const productId = parent.id; // Obtener el ID del producto
    delete cart[productId]; // Eliminar el producto del carrito

    // Actualizar la cantidad del producto en la tabla
    const quantityInput = parent.querySelector('.quantity-input');
    quantityInput.value = 0;

    // Calcular y actualizar el precio total del carrito
    let total = 0;
    for (const item in cart) {
      total += cart[item].price * cart[item].quantity;
    }
    totalPrice.textContent = '$' + total.toFixed(2);
  });
});

// Agregar un evento de click al botón de finalizar compra
finalizarBtn.addEventListener('click', () => {
  // Enviar los datos del carrito al servidor
  fetch('/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  })
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta del servidor
    console.log(data);
    alert('¡Gracias por su compra!');
    cart = {}; // Vaciar el carrito
    location.reload(); // Recargar la página
  })
  .catch(error => {
    console.error(error);
    alert('Ha ocurrido un error al procesar su compra.');
  });
});

// Calcular y actualizar el precio total del carrito
let total = 0;
for (const item in cart) {
  total += cart[item].price * cart[item].quantity;
}
totalPrice.textContent = '$' + total.toFixed(2);

if (total > 0) {
  totalPrice.classList.add('positive');
} else {
  totalPrice.classList.remove('positive');
}

