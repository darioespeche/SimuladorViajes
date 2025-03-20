// Arrays para orígenes y sus costos adicionales
const origins = [
  "Córdoba",
  "Buenos Aires",
  "Montevideo",
  "Santiago de Chile",
  "Río de Janeiro",
  "Asuncion",
];
const costosOrigen = [100, 200, 150, 180, 220, 130];

// Arrays para destinos, sus costos base y tiempos de vuelo
const destinos = [
  "París",
  "Tokio",
  "Nueva York",
  "Río de Janeiro",
  "Londres",
  "Cancun",
  "El Cairo",
  "Berlin",
  "Sidney",
];
const preciosTransporte = [1200, 1500, 1100, 800, 1300, 900, 1400, 1600, 1700];
const tiemposVuelo = [12, 18, 8, 6, 11, 9, 13, 15, 17];

// Verifica que el usuario haya iniciado sesión; si no, redirige a login
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// Calcula el costo final y el tiempo de vuelo combinando el costo extra del origen y el costo base del destino
// Además, agrega un costo adicional de $50 por día de viaje.
function calcularCostos(indiceOrigen, indiceDestino, diasViaje) {
  const costoBase =
    preciosTransporte[indiceDestino] + costosOrigen[indiceOrigen];
  const costoAdicional = diasViaje * 50;
  return {
    costo: costoBase + costoAdicional,
    tiempo: tiemposVuelo[indiceDestino],
  };
}

// Muestra el resumen del viaje en el DOM
function mostrarResumen(viaje, titulo = "Resumen del viaje") {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">
          Tu viaje desde <strong>${viaje.origen}</strong> hasta <strong>${viaje.destino}</strong>:
        </p>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Costo: $${viaje.costo}</li>
          <li class="list-group-item">Tiempo estimado: ${viaje.tiempo} horas</li>
          <li class="list-group-item">Días de viaje: ${viaje.dias}</li>
        </ul>
      </div>
    </div>
  `;
  document.getElementById("acciones").style.display = "block";
}

// Al cargar la página, recupera y muestra el viaje guardado, si existe
document.addEventListener("DOMContentLoaded", () => {
  const viajeGuardado = localStorage.getItem("viaje");
  if (viajeGuardado) {
    mostrarResumen(JSON.parse(viajeGuardado), "Resumen del viaje guardado");
  }
});

// Listener para el formulario de viaje con validación HTML5 + Bootstrap
const form = document.getElementById("formViaje");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.remove("was-validated");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Obtiene los índices seleccionados para origen y destino
  const indiceOrigen = parseInt(document.getElementById("origen").value, 10);
  const indiceDestino = parseInt(document.getElementById("destino").value, 10);

  // Obtiene las fechas seleccionadas
  const fechaSalidaStr = document.getElementById("fechaSalida").value;
  const fechaRegresoStr = document.getElementById("fechaRegreso").value;

  const fechaSalida = new Date(fechaSalidaStr);
  const fechaRegreso = new Date(fechaRegresoStr);

  // Validación simple: la fecha de regreso debe ser posterior a la fecha de salida
  if (fechaRegreso <= fechaSalida) {
    alert("La fecha de regreso debe ser posterior a la fecha de salida");
    return;
  }

  // Calcula la diferencia en días
  const diffMs = fechaRegreso - fechaSalida;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Calcula los costos incluyendo el costo adicional por día de viaje
  const datosViaje = calcularCostos(indiceOrigen, indiceDestino, diffDays);

  const viaje = {
    origen: origins[indiceOrigen],
    destino: destinos[indiceDestino],
    costo: datosViaje.costo,
    tiempo: datosViaje.tiempo,
    dias: diffDays,
  };

  mostrarResumen(viaje);
  localStorage.setItem("viaje", JSON.stringify(viaje));
});

// Listener para limpiar los datos guardados
document.getElementById("limpiarDatos").addEventListener("click", () => {
  localStorage.removeItem("viaje");
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("acciones").style.display = "none";
});
