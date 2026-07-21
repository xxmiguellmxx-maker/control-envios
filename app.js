"use strict";

document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema(){

    console.log(CONFIG.APP_NAME);

    console.log(CONFIG.VERSION);

    mostrarMensaje("Sistema iniciado.","info");

    document

        .getElementById("btnEscanear")

        .addEventListener("click", function(){

            bloquearBoton();

            mostrarMensaje("Preparando cámara...","info");

        });

}
