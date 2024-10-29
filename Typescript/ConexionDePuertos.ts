// Elementos HTML
const connectButton = document.getElementById("connect-btn") as HTMLButtonElement;
const analyzeButton = document.getElementById("analyze-btn") as HTMLButtonElement;
const closeButton = document.getElementById("close-btn") as HTMLButtonElement; // Nuevo botón
const statusMessage = document.getElementById("status-message") as HTMLParagraphElement;

let device: BluetoothDevice | null = null;
let server: BluetoothRemoteGATTServer | null = null;
let characteristic: BluetoothRemoteGATTCharacteristic | null = null;

// Función para conectar al dispositivo Bluetooth
async function connectBluetooth() {
  try {
    statusMessage.textContent = "Conectando...";

    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }] 
    });

    if (!device) {
      statusMessage.textContent = "Dispositivo no seleccionado.";
      return;
    }

    //server = await device.gatt?.connect();
    //if (!server) {
      //statusMessage.textContent = "No se pudo conectar al servidor GATT.";
      //return;
    //}

    //const service = await server.getPrimaryService('battery_service');
    //characteristic = await service.getCharacteristic('battery_level');

    statusMessage.textContent = "Dispositivo conectado. Listo para analizar.";
  }
   catch (error) {
    console.error("Error en la conexión Bluetooth:", error);
    statusMessage.textContent = "Error en la conexión.";
  }
}

// Función para iniciar el análisis de calidad de aire
async function startAnalysis() {
  if (!characteristic) {
    statusMessage.textContent = "Por favor, conecta un dispositivo primero.";
    return;
  }

  try {
    statusMessage.textContent = "Analizando...";

    const value = await characteristic.readValue();
    const batteryLevel = value.getUint8(0);

    statusMessage.textContent = `Nivel de batería: ${batteryLevel}%`;
  } catch (error) {
    console.error("Error en el análisis:", error);
    statusMessage.textContent = "Error en el análisis.";
  }
}

// Función para cerrar la pestaña
function closeTab() {
  window.close(); // Cierra la pestaña
}

// Event listeners para los botones
connectButton.addEventListener("click", connectBluetooth);
analyzeButton.addEventListener("click", startAnalysis);
closeButton.addEventListener("click", closeTab); // Agrega el event listener para cerrar la pestaña

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

