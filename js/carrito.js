// Obtener elementos de la tabla
const quantityBtns = document.querySelectorAll('.quantity-btn');
const deleteBtns = document.querySelectorAll('.delete-btn');
const totalPriceEl = document.querySelector('#total-price');
const productRows = document.querySelectorAll('tbody tr');

// Inicializar precio total en 0
let totalPrice = 0;

// Función para actualizar el precio total
function updateTotalPrice() {
  totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
}

// Agregar event listeners a los botones de cantidad
quantityBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const row = e.target.closest('tr'); // obtener fila
    const quantityInput = row.querySelector('.quantity-input'); // obtener input de cantidad
    const priceEl = row.querySelector('.product-price'); // obtener precio del producto
    const price = parseFloat(priceEl.textContent.replace('$', '')); // obtener precio como número

    if (e.target.classList.contains('minus')) {
      // Restar 1 a la cantidad
      const quantity = parseInt(quantityInput.value);
      if (quantity > 0) {
        quantityInput.value = quantity - 1;
        totalPrice -= price; // Restar precio del producto al precio total
        updateTotalPrice(); // Actualizar precio total en la tabla
      }
    } else if (e.target.classList.contains('plus')) {
      // Sumar 1 a la cantidad
      quantityInput.value = parseInt(quantityInput.value) + 1;
      totalPrice += price; // Sumar precio del producto al precio total
      updateTotalPrice(); // Actualizar precio total en la tabla
    }
  });
});

// Agregar event listener al botón de eliminar
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const row = e.target.closest('tr'); // obtener fila
    const quantityInput = row.querySelector('.quantity-input'); // obtener input de cantidad
    const priceEl = row.querySelector('.product-price'); // obtener precio del producto
    const price = parseFloat(priceEl.textContent.replace('$', '')); // obtener precio como número
    const quantity = parseInt(quantityInput.value);

    totalPrice -= price * quantity; // Restar precio total del producto al precio total
    updateTotalPrice(); // Actualizar precio total en la tabla

    row.remove(); // Eliminar fila de la tabla
  });
});

const btnFinalizar = document.getElementById('finalizar-btn');
btnFinalizar.addEventListener('click', () => {
  const totalCompra = document.getElementById('total-price').innerText;
  alert(`¡Compra realizada con éxito! Total de la compra: ${totalCompra}`);
});