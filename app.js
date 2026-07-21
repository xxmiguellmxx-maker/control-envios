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

let enviando = false;
let ultimaGuia = "";

async function codigoDetectado(texto) {

    if (enviando) return;

    if (texto === ultimaGuia) return;

    ultimaGuia = texto;

    enviando = true;

    mostrarMensaje("Enviando guía...", "ok");

    try {

        const respuesta = await fetch(CONFIG.API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                guia: texto,

                usuario: document.getElementById("usuario").value

            })

        });

        const datos = await respuesta.json();

        if (datos.ok) {

            mostrarMensaje(datos.mensaje, "ok");

        } else {

            mostrarMensaje(datos.mensaje, "error");

        }

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error de conexión.", "error");

    }

    setTimeout(() => {

        enviando = false;
        ultimaGuia = "";

    }, 1000);

}

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
