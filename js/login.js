document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Recuperar valores ingresados
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validación nativa de HTML5: se muestra feedback automáticamente
  if (!this.checkValidity()) {
    this.classList.add("was-validated");
    return;
  }

  // Para este ejemplo usamos datos "hardcodeados"
  const usuarioCorrecto = "usuario";
  const contrasenaCorrecta = "1234";

  if (username === usuarioCorrecto && password === contrasenaCorrecta) {
    // Guarda el estado de autenticación en localStorage
    localStorage.setItem("loggedIn", "true");
    // Redirige a la página del simulador
    window.location.href = "index.html";
  } else {
    // Muestra un mensaje de error visual
    document.getElementById("loginError").style.display = "block";
  }
});
