/************************************************
 * CONTROL DE ENVÍOS
 * APP.JS
 * VERSIÓN 2.0
 ************************************************/

"use strict";

let scanner = null;
let escaneando = false;

document.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp() {

    console.log(CONFIG.APP_NAME);
    console.log(CONFIG.VERSION);

    document
        .getElementById("btnEscanear")
        .addEventListener("click", toggleScanner);

}

async function toggleScanner() {

    if (escaneando) {

        detenerScanner();
        return;

    }

    iniciarScanner();

}

async function iniciarScanner() {

    try {

        mostrarMensaje("Abriendo cámara...", "ok");

        scanner = new Html5Qrcode("reader");

        await scanner.start(

            {
                facingMode: "environment"
            },

            {
                fps: 10,
                qrbox: {
                    width: 280,
                    height: 180
                }
            },

            codigoDetectado,

            errorEscaneo

        );

        escaneando = true;

        const boton = document.getElementById("btnEscanear");

        boton.textContent = "Detener Escáner";

    }
    catch (error) {

        console.error(error);

        mostrarMensaje("No fue posible abrir la cámara.", "error");

    }

}

async function detenerScanner() {

    if (!scanner) return;

    await scanner.stop();

    await scanner.clear();

    scanner = null;

    escaneando = false;

    document.getElementById("reader").innerHTML = "";

    document.getElementById("btnEscanear").textContent = "Iniciar Escáner";

    mostrarMensaje("Escáner detenido.", "ok");

}

function codigoDetectado(texto) {

    mostrarMensaje("Código leído: " + texto, "ok");

    console.log(texto);

}

function errorEscaneo(error) {

    // Se ignoran los errores normales de búsqueda.
}

function mostrarMensaje(texto, tipo = "ok") {

    const mensaje = document.getElementById("mensaje");

    mensaje.style.display = "block";

    mensaje.className = tipo;

    mensaje.textContent = texto;

}
