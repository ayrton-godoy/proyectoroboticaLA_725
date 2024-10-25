// Elementos HTML
const connectButton = document.getElementById("connect-btn") as HTMLButtonElement;
const analyzeButton = document.getElementById("analyze-btn") as HTMLButtonElement;
const statusMessage = document.getElementById("status-message") as HTMLParagraphElement;

let device: BluetoothDevice | null = null;
let server: BluetoothRemoteGATTServer | null = null;
let characteristic: BluetoothRemoteGATTCharacteristic | null = null;

// Función para conectar al dispositivo Bluetooth
async function connectBluetooth() {
  try {
    statusMessage.textContent = "Conectando...";
    
    // Solicita el dispositivo con un filtro de servicio
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }] // Cambia el servicio según tu dispositivo
    });

    if (!device) {
      statusMessage.textContent = "Dispositivo no seleccionado.";
      return;
    }

    // Conéctate al servidor GATT
    server = await device.gatt?.connect();
    if (!server) {
      statusMessage.textContent = "No se pudo conectar al servidor GATT.";
      return;
    }

    // Obtén el servicio y la característica
    const service = await server.getPrimaryService('battery_service');
    characteristic = await service.getCharacteristic('battery_level');

    statusMessage.textContent = "Dispositivo conectado. Listo para analizar.";
  } catch (error) {
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
    
    // Lee el valor de la característica (ejemplo: nivel de batería)
    const value = await characteristic.readValue();
    const batteryLevel = value.getUint8(0); // Cambia la interpretación según tu dispositivo

    statusMessage.textContent = `Nivel de batería: ${batteryLevel}%`; // Muestra el valor en la interfaz
  } catch (error) {
    console.error("Error en el análisis:", error);
    statusMessage.textContent = "Error en el análisis.";
  }
}

// Event listeners para los botones
connectButton.addEventListener("click", connectBluetooth);
analyzeButton.addEventListener("click", startAnalysis);
