// promos.js

// Array con la info de las promociones (id, título, precio, fechas, imagen, etc.)
const promociones = [
  {
    id: 1,
    title: "Córdoba - Cancun",
    price: 900,
    dates: "Del 8 de junio al 17 de junio",
    image: "img/cancun.jpg",
  },
  {
    id: 2,
    title: "Buenos Aires - París",
    price: 1100,
    dates: "Del 10 de julio al 20 de julio",
    image: "img/paris.jpg",
  },
  {
    id: 3,
    title: "Santiago de Chile - Tokio",
    price: 1300,
    dates: "Del 1 de agosto al 15 de agosto",
    image: "img/tokio.jpg",
  },
  {
    id: 4,
    title: "Montevideo - Berlin",
    price: 1200,
    dates: "Del 23 de agosto al 30 de agosto",
    image: "img/berlin.jpg",
  },
  {
    id: 5,
    title: "Asuncion - Nueva York",
    price: 800,
    dates: "Del 1 de septiembre al 15 de septiembre",
    image: "img/newyork.jpg",
  },
  {
    id: 6,
    title: "Rio de Janeiro - Londres",
    price: 700,
    dates: "Del 2 de abril al 15 de abril",
    image: "img/londres.jpg",
  },
];

// Carrito de promociones
let carrito = [];

// Al cargar la página, recuperamos el carrito si existe y configuramos los listeners
document.addEventListener("DOMContentLoaded", () => {
  // Recuperar carrito de localStorage
  const carritoGuardado = localStorage.getItem("carritoPromos");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

  // Asignar listener a cada botón "Añadir al Carrito" en las tarjetas
  const addCartButtons = document.querySelectorAll(".btn-add-cart");
  addCartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const promoId = parseInt(e.target.dataset.promoId, 10);
      añadirAlCarrito(promoId);
    });
  });

  // Botón para ver el carrito
  const btnVerCarrito = document.getElementById("btnVerCarrito");
  if (btnVerCarrito) {
    btnVerCarrito.addEventListener("click", () => {
      mostrarCarrito();
    });
  }
});

// Función para añadir promo al carrito
function añadirAlCarrito(promoId) {
  const promoSeleccionada = promociones.find((p) => p.id === promoId);
  if (promoSeleccionada) {
    carrito.push(promoSeleccionada);
    localStorage.setItem("carritoPromos", JSON.stringify(carrito));
    mostrarToast(`Se añadió: ${promoSeleccionada.title} al carrito`);
  } else {
    mostrarToast("No se encontró la promoción seleccionada.");
  }
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carritoContainer = document.getElementById("carritoContainer");
  if (!carritoContainer) return;

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  let html = `
      <h3>Carrito de Promociones</h3>
      <ul class="list-group">
    `;
  carrito.forEach((promo) => {
    html += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${promo.title}</strong> - $${promo.price} <br/>
            <small>${promo.dates}</small>
          </div>
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${promo.id})">
            Eliminar
          </button>
        </li>
      `;
  });
  html += "</ul>";
  carritoContainer.innerHTML = html;
}

// Función para eliminar promo del carrito
function eliminarDelCarrito(promoId) {
  carrito = carrito.filter((p) => p.id !== promoId);
  localStorage.setItem("carritoPromos", JSON.stringify(carrito));
  mostrarCarrito();
}
// Función para mostrar un toast de Bootstrap
function mostrarToast(mensaje) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  // Estructura del toast (ejemplo con color de fondo verde - success)
  const toastHTML = `
      <div class="toast align-items-center text-bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${mensaje}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

  // Crear un div temporal y obtener la referencia real del toast
  const toastDiv = document.createElement("div");
  toastDiv.innerHTML = toastHTML.trim();
  const toastElement = toastDiv.firstChild;

  // Agregarlo al contenedor
  container.appendChild(toastElement);

  // Eliminar el toast después de 3 segundos (opcional)
  setTimeout(() => {
    toastElement.classList.remove("show");
    if (toastElement.parentNode) {
      container.removeChild(toastElement);
    }
  }, 3000);
}
