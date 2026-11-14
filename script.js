// CAMBIAR ENTRE SECCIONES

function mostrar(nombre, enlace) {

    const seccion = document.getElementById(nombre);
    if (!seccion || !seccion.classList.contains("seccion")) return;

    document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
    seccion.classList.add("activa");

    // Marca el enlace del menú que corresponde a la sección
    document.querySelectorAll(".sidebar nav a").forEach(a => {
        a.classList.toggle("activo", a.dataset.seccion === nombre);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Todos los enlaces internos (menú y botones) llevan data-seccion
document.addEventListener("click", function (event) {
    const enlace = event.target.closest("a[data-seccion]");
    if (!enlace) return;

    event.preventDefault();
    const nombre = enlace.dataset.seccion;
    mostrar(nombre, enlace);
    history.replaceState(null, "", "#" + nombre);
});

// Si la página se abre con #galeria, #videos, etc., muestra esa sección
window.addEventListener("DOMContentLoaded", function () {
    const nombre = location.hash.replace("#", "");
    if (nombre) mostrar(nombre);
});


// MOSTRAR LAS LETRAS DE LAS CANCIONES

function mostrarLetra(nombre, boton) {

    document.querySelectorAll(".letra").forEach(l => l.classList.remove("visible"));

    const seleccion = document.getElementById(nombre);
    if (seleccion) seleccion.classList.add("visible");

    document.querySelectorAll(".menu-letras button").forEach(b => b.classList.remove("seleccionada"));
    if (boton) boton.classList.add("seleccionada");
}


// EVITAR QUE SE REPRODUZCAN VARIOS AUDIOS/VIDEOS AL MISMO TIEMPO

document.addEventListener("play", function (event) {

    const tipo = event.target.tagName;
    if (tipo !== "AUDIO" && tipo !== "VIDEO") return;

    document.querySelectorAll("audio, video").forEach(medio => {
        if (medio !== event.target) medio.pause();
    });

}, true);
