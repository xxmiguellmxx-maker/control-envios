"use strict";

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnEscanear")
        .addEventListener("click", enviarPrueba);

});

async function enviarPrueba() {

    mostrarMensaje("Enviando guía de prueba...", "ok");

    try {

        const respuesta = await fetch(CONFIG.API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                guia: "PRUEBA-" + Date.now(),

                usuario: document.getElementById("usuario").value

            })

        });

        const datos = await respuesta.json();

        if (datos.ok) {

            mostrarMensaje(datos.mensaje, "ok");

        } else {

            mostrarMensaje(datos.mensaje, "error");

        }

        console.log(datos);

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error de conexión", "error");

    }

}

function mostrarMensaje(texto, tipo = "ok") {

    const mensaje = document.getElementById("mensaje");

    mensaje.style.display = "block";

    mensaje.className = tipo;

    mensaje.textContent = texto;

}
