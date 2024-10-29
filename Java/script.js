function handleConnect() {
    const statusMessage = document.getElementById('statusMessage');
    
    const devicesConnected = false; 
    if (!devicesConnected) {
        alert("No hay dispositivos conectados."); // Ventana emergente
    } else {
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.innerText = "Conectando...";
    }

    if (!devicesConnected) {
        statusMessage.innerText = "No hay dispositivos conectados.";
    } else {
        statusMessage.innerText = "Conectando...";
        
        setTimeout(() => {
            statusMessage.innerText = "Conexión exitosa.";
        }, 2000);
    }
}

function handleAnalyze() {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerText = "Analizando...";

    setTimeout(() => {
        statusMessage.innerText = "Análisis rechazado, no hay dispositivo conectado.";
    }, 2000);
}

