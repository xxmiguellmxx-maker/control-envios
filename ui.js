/*************************************************
 * UI.JS
 * Control de Envíos
 *************************************************/

"use strict";

/**
 * Muestra un mensaje al usuario.
 * @param {string} texto
 * @param {string} tipo ok | error | info
 */
function mostrarMensaje(texto, tipo = "info") {

    const mensaje = document.getElementById("mensaje");

    mensaje.style.display = "block";

    mensaje.textContent = texto;

    mensaje.className = "";

    switch (tipo) {

        case "ok":
            mensaje.classList.add("ok");
            break;

        case "error":
            mensaje.classList.add("error");
            break;

        default:
            mensaje.style.background = "#E3F2FD";
            mensaje.style.color = "#1565C0";
            break;

    }

}

/**
 * Oculta el mensaje.
 */
function ocultarMensaje() {

    const mensaje = document.getElementById("mensaje");

    mensaje.style.display = "none";

}

/**
 * Devuelve el usuario seleccionado.
 */
function obtenerUsuario() {

    return document.getElementById("usuario").value;

}

/**
 * Bloquea el botón.
 */
function bloquearBoton() {

    const boton = document.getElementById("btnEscanear");

    boton.disabled = true;

    boton.textContent = "Escaneando...";

}

/**
 * Desbloquea el botón.
 */
function desbloquearBoton() {

    const boton = document.getElementById("btnEscanear");

    boton.disabled = false;

    boton.textContent = "Iniciar Escáner";

}
