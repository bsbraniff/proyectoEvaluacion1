document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const btnEnviar = document.getElementById("btn-enviar");
  const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
  const confirmSend = document.getElementById("confirmSend");

  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const mensaje = document.getElementById("mensaje");
  const tipo = document.getElementById("tipo");

  const modalNombre = document.getElementById("modalNombre");
  const modalCorreo = document.getElementById("modalCorreo");
  const modalMensaje = document.getElementById("modalMensaje");
  const modalTipo = document.getElementById("modalTipo");

  // funcion 1 Validación simple
  function validarFormulario() {
    let esValido = true;
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    if (nombre.value.trim() === "") {
      mostrarError(nombre, "El nombre es obligatorio.");
      esValido = false;
    }

    if (correo.value.trim() === "" || !correo.value.includes("@")) {
      mostrarError(correo, "Ingrese un correo válido.");
      esValido = false;
    }

    if (mensaje.value.trim().length < 5) {
      mostrarError(mensaje, "El mensaje debe tener al menos 5 caracteres.");
      esValido = false;
    }

    return esValido;
  }

  // funcion 2 Mostrar errores debajo del input
  function mostrarError(input, mensaje) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) errorDiv.textContent = mensaje;
  }

  //  funcion 3 Cambiar automáticamente el tipo según texto
  function sincronizarTipo() {
    const texto = mensaje.value.toLowerCase();
    if (texto.includes("consulta")) tipo.value = "consulta";
    else if (texto.includes("vender") || texto.includes("venta")) tipo.value = "venta";
    else if (texto.includes("comprar") || texto.includes("compra")) tipo.value = "compra";
    else tipo.value = "otro";
  }

  // funcion 4  Mostrar modal con datos cargados
  function mostrarModalConfirmacion() {
    modalNombre.textContent = nombre.value;
    modalCorreo.textContent = correo.value;
    modalMensaje.textContent = mensaje.value;
    modalTipo.textContent = tipo.options[tipo.selectedIndex].text;
    confirmModal.show();
  }

  // funcion 5 Resetear formulario tras envío
  function reiniciarFormulario() {
    form.reset();
  }

  // Enviar formulario
  btnEnviar.addEventListener("click", function (e) {
    e.preventDefault();
    if (validarFormulario()) {
      mostrarModalConfirmacion();
    }
  });

  // Confirmar envío desde el modal
  confirmSend.addEventListener("click", function () {
    confirmModal.hide();
    alert("Formulario enviado correctamente. ¡Gracias por tu mensaje!");
    reiniciarFormulario();
  });

  // Detectar palabras clave al escribir
  mensaje.addEventListener("input", sincronizarTipo);
});
