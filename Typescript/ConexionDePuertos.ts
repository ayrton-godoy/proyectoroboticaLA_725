function handleConnect(): void {
  const statusMessage = document.getElementById('statusMessage') as HTMLDivElement | null;

  const devicesConnected = false;
  if (!statusMessage) return; // Verifica si el elemento existe

  if (!devicesConnected) {
    alert("No hay dispositivos conectados."); // Ventana emergente
    statusMessage.innerText = "No hay dispositivos conectados.";
  } else {
    statusMessage.innerText = "Conectando...";
    setTimeout(() => {
      statusMessage.innerText = "Conexión exitosa.";
    }, 2000);
  }
}

function handleAnalyze(): void {
  const statusMessage = document.getElementById('statusMessage') as HTMLDivElement | null;

  if (!statusMessage) return; // Verifica si el elemento existe

  statusMessage.innerText = "Analizando...";
  setTimeout(() => {
    statusMessage.innerText = "Análisis rechazado, no hay dispositivo conectado.";
  }, 2000);
}


