function handleConnect() {
    var statusMessage = document.getElementById('statusMessage');
    var devicesConnected = false;
    if (!statusMessage)
        return; // Verifica si el elemento existe
    if (!devicesConnected) {
        alert("No hay dispositivos conectados."); // Ventana emergente
        statusMessage.innerText = "No hay dispositivos conectados.";
    }
    else {
        statusMessage.innerText = "Conectando...";
        setTimeout(function () {
            statusMessage.innerText = "Conexión exitosa.";
        }, 2000);
    }
}
function handleAnalyze() {
    var statusMessage = document.getElementById('statusMessage');
    if (!statusMessage)
        return; // Verifica si el elemento existe
    statusMessage.innerText = "Analizando...";
    setTimeout(function () {
        statusMessage.innerText = "Análisis rechazado, no hay dispositivo conectado.";
    }, 2000);
}
