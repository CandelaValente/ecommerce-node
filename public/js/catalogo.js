// Aquí cargamos los productos desde el archivo JSON. 
// Asegúrate de tener el archivo JSON correctamente en el servidor.
const productos = [
  { "id": 1, "nombre": "Reloj Elegante", "precio": 199, "imagen": "reloj1.jpg" },
  { "id": 2, "nombre": "Reloj Deportivo", "precio": 120, "imagen": "reloj2.jpg" },
  { "id": 3, "nombre": "Reloj Clásico", "precio": 150, "imagen": "reloj3.jpg" }
];

// Función para cargar los productos en el catálogo
function cargarProductos() {
  const contenedorProductos = document.getElementById('productos-container');
  contenedorProductos.innerHTML = ""; // Limpiar contenedor antes de agregar los productos

  productos.forEach(producto => {
    const productoHTML = document.createElement('div');
    productoHTML.classList.add('producto');
    productoHTML.innerHTML = `
        <img src="images/${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      `;
    contenedorProductos.appendChild(productoHTML);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = "";

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
  carrito = carrito.filter(item => item.id !== id);

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
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

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
}

// Función para vaciar el carrito y mostrar mensaje de pago
function pagar() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length > 0) {
    carrito = [];  // Vaciar carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar en localStorage

    alert("¡Gracias por tu compra! El carrito se ha vaciado.");
    mostrarCarrito();
  } else {
    alert("Tu carrito está vacío.");
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuario'); // Eliminar usuario de la sesión
  window.location.href = "index.html"; // Redirigir a la página de login (index.html)
}

function mostrarModal(){
  modal.style.display = "block";
}

// Llamar a esta función cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  mostrarCarrito();

  const modal = document.getElementById("modal");
  const closeButton = document.getElementById("closeButton");
  

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar el modal haciendo clic fuera de él
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});