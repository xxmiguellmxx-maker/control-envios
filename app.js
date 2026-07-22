/************************************************
 * CONTROL DE ENVÍOS
 * APP.JS
 * VERSIÓN 2.0
 ************************************************/

"use strict";

let scanner = null;
let escaneando = false;
let enviando = false;
let ultimaGuia = "";
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

    const parametros = new URLSearchParams();

    parametros.append("guia", texto);
    parametros.append("usuario", document.getElementById("usuario").value);

    const respuesta = await fetch(CONFIG.API_URL, {

        method: "POST",

        body: parametros

    });

    const resultado = await respuesta.json();

    if (resultado.ok) {

        mostrarMensaje(resultado.mensaje, "ok");

    } else {

        mostrarMensaje(resultado.mensaje, "error");

    }

} catch (error) {

    console.error(error);

    mostrarMensaje("Error de conexión con el servidor.", "error");

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

async function codigoDetectado(texto) {

    if (enviando) return;

    if (texto === ultimaGuia) return;

    ultimaGuia = texto;

    enviando = true;

    mostrarMensaje("Registrando guía...", "ok");

    try {

        const datos = new URLSearchParams();

datos.append("guia", texto);
datos.append("usuario", document.getElementById("usuario").value);

const respuesta = await fetch(CONFIG.API_URL, {

    method: "POST",

    body: datos

});

        });

        const datos = await respuesta.json();

        if (datos.ok) {

            mostrarMensaje(datos.mensaje, "ok");

        } else {

            mostrarMensaje(datos.mensaje, "error");

        }

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error de conexión con el servidor.", "error");

    }

    setTimeout(() => {

        enviando = false;
        ultimaGuia = "";

    }, 1000);

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
