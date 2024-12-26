// Función para agregar al carrito
function agregarAlCarrito(id) {
    // Obtener los relojes desde el catálogo cargado
    fetch('/relojes')
      .then(response => response.json())
      .then(relojes => {
        const reloj = relojes.find(r => r.id === id); // Buscar el reloj por ID
  
        if (reloj) {
          // Obtener el carrito del localStorage (o sessionStorage)
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
          // Verificar si el producto ya está en el carrito
          const productoExistente = carrito.find(item => item.id === id);
  
          if (productoExistente) {
            // Si el producto ya está en el carrito, solo aumentar la cantidad
            productoExistente.cantidad += 1;
          } else {
            // Si no está, agregar el producto con cantidad 1
            carrito.push({ ...reloj, cantidad: 1 });
          }
  
          // Guardar el carrito actualizado en el localStorage
          localStorage.setItem('carrito', JSON.stringify(carrito));
  
          alert("Producto agregado al carrito");
        }
      })
      .catch(error => console.error("Error al agregar al carrito", error));
  }
  
  // Función para mostrar el carrito
  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = ""; // Limpiar el contenedor
  
    if (carrito.length === 0) {
      carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
      carrito.forEach(item => {
        const carritoItem = document.createElement('div');
        carritoItem.classList.add('carrito-item');
        carritoItem.innerHTML = `
          <img src="images/${item.imagen}" alt="${item.nombre}">
          <h3>${item.nombre}</h3>
          <p>Precio: $${item.precio}</p>
          <p>Cantidad: <span id="cantidad-${item.id}">${item.cantidad}</span></p>
          <button onclick="editarCantidad(${item.id}, 'sumar')">+</button>
          <button onclick="editarCantidad(${item.id}, 'restar')">-</button>
          <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(carritoItem);
      });
    }
  }
  
  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id); // Filtrar el producto por ID
  
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    mostrarCarrito(); // Volver a mostrar el carrito
  }
  
  // Función para editar la cantidad de un producto en el carrito
  function editarCantidad(id, operacion) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === id);
  
    if (producto) {
      if (operacion === 'sumar') {
        producto.cantidad += 1;
      } else if (operacion === 'restar' && producto.cantidad > 1) {
        producto.cantidad -= 1;
      }
  
      // Guardar el carrito actualizado
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito(); // Volver a mostrar el carrito
    }
  }
  
  // Llamar a esta función cuando cargue la página para mostrar el carrito
  document.addEventListener('DOMContentLoaded', mostrarCarrito);