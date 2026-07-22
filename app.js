async function codigoDetectado(texto) {

    if (enviando) return;

    if (texto === ultimaGuia) return;

    ultimaGuia = texto;
    enviando = true;

    mostrarMensaje("Registrando guía...", "ok");

    try {

        const parametros = new URLSearchParams();

        parametros.append("guia", texto);
        parametros.append(
            "usuario",
            document.getElementById("usuario").value
        );

        const respuesta = await fetch(CONFIG.API_URL, {
            method: "POST",
            body: parametros
        });

        console.log("========== RESPUESTA DEL SERVIDOR ==========");
        console.log("Status:", respuesta.status);
        console.log("Status Text:", respuesta.statusText);
        console.log("OK:", respuesta.ok);

        const textoRespuesta = await respuesta.text();

        console.log("Contenido recibido:");
        console.log(textoRespuesta);
        console.log("============================================");

        mostrarMensaje(textoRespuesta, "ok");

    } catch (error) {

        console.error("========== ERROR ==========");
        console.error(error);
        console.error("Mensaje:", error.message);
        console.error("===========================");

        mostrarMensaje("ERROR: " + error.message, "error");

    }

    setTimeout(() => {

        enviando = false;
        ultimaGuia = "";

    }, 1000);

}
