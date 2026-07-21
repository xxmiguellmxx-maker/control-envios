/************************************************
 * CONTROL DE ENVÍOS
 * APP.JS
 * Versión 1.0
 ************************************************/

"use strict";

let scanner = null;
let escaneando = false;
let ultimaGuia = "";

/**
 * Inicia la aplicación
 */
document.addEventListener("DOMContentLoaded", inicializarApp);

function inicializarApp() {

    console.log(CONFIG.APP_NAME);
    console.log(CONFIG.VERSION);

    const boton = document.getElementById("btnEscanear");

    boton.addEventListener("click", iniciarScanner);

}

/**
 * Mostrar mensajes
 */
function mostrarMensaje(texto, tipo = "ok") {

    const mensaje = document.getElementById("mensaje");

    mensaje.style.display = "block";

    mensaje.className = tipo;

    mensaje.textContent = texto;

}

/**
 * Iniciar cámara
 */
async function iniciarScanner() {

    if (escaneando) return;

    escaneando = true;

    mostrarMensaje("Abriendo cámara...");

    console.log("Inicializando escáner...");

}
