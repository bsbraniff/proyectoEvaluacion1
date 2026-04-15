document.addEventListener("DOMContentLoaded", () => {
    const fecha = new Date();
    const fechaTexto = fecha.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

    const hora = fecha.getHours();
    let saludo = "¡Hola!";
    if (hora < 12) saludo = "¡Buenos días!";
    else if (hora < 18) saludo = "¡Buenas tardes!";
    else saludo = "¡Buenas noches!";

    document.getElementById("fecha-hoy").textContent = `Hoy es ${fechaTexto}`;
    document.getElementById("saludo-hora").textContent = saludo;
});
