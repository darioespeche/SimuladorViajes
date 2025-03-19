const destinos = ["París", "Tokio", "Nueva York", "Río de Janeiro"];
const preciosTransporte = [1200, 1500, 1100, 800];
const tiemposVuelo = [12, 18, 8, 6];

// Calcula costo y tiempo según índice de destino
function calcularCostos(indiceDestino) {
  return {
    costo: preciosTransporte[indiceDestino],
    tiempo: tiemposVuelo[indiceDestino],
  };
}

// Muestra resumen en el DOM
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
        </ul>
      </div>
    </div>
  `;
  document.getElementById("acciones").style.display = "block";
}

// Al cargar la página, recupera viaje guardado
document.addEventListener("DOMContentLoaded", () => {
  const viajeGuardado = localStorage.getItem("viaje");
  if (viajeGuardado)
    mostrarResumen(JSON.parse(viajeGuardado), "Resumen del viaje guardado");
});

// Nuevo listener usando validación HTML5 + Bootstrap
const form = document.getElementById("formViaje");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.remove("was-validated");

  // Si algún campo no pasa validación, mostramos feedback
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const origen = document.getElementById("origen").value.trim();
  const indiceDestino = parseInt(document.getElementById("destino").value, 10);
  const datosViaje = calcularCostos(indiceDestino);

  const viaje = {
    origen,
    destino: destinos[indiceDestino],
    costo: datosViaje.costo,
    tiempo: datosViaje.tiempo,
  };

  mostrarResumen(viaje);
  localStorage.setItem("viaje", JSON.stringify(viaje));
});

// Botón para limpiar datos guardados
document.getElementById("limpiarDatos").addEventListener("click", () => {
  localStorage.removeItem("viaje");
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("acciones").style.display = "none";
});
