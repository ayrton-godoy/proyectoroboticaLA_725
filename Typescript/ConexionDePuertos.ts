let device: BluetoothDevice | null = null;
let server: BluetoothRemoteGATTServer | null = null;
let characteristic: BluetoothRemoteGATTCharacteristic | null = null;

// Función para conectar el dispositivo Bluetooth
async function connectBluetooth() {
  try {
    // 1. Solicita el dispositivo Bluetooth con los servicios que necesitas
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }], // Puedes cambiar 'battery_service' por el UUID de tu servicio
      optionalServices: ['device_information'] // Incluye servicios opcionales
    });

    if (!device) {
      console.log("No se seleccionó ningún dispositivo.");
      return;
    }

    // 2. Conéctate al servidor GATT del dispositivo
    server = await device.gatt?.connect();
    if (!server) {
      console.error("No se pudo conectar al servidor GATT.");
      return;
    }

    // 3. Obtén el servicio y la característica que deseas usar
    const service = await server.getPrimaryService('battery_service');
    characteristic = await service.getCharacteristic('battery_level'); // Cambia a la característica que necesites

    // 4. Lee el valor inicial de la característica
    const value = await characteristic.readValue();
    console.log("Nivel de batería:", value.getUint8(0));

    // 5. Configura una función de escucha para cuando cambie el valor
    characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
    await characteristic.startNotifications();

    console.log("Conectado al dispositivo Bluetooth.");
  } catch (error) {
    console.error("Error al conectar el dispositivo Bluetooth:", error);
  }
}

// Función para manejar los cambios en el valor de la característica
function handleCharacteristicValueChanged(event: Event) {
  const target = event.target as BluetoothRemoteGATTCharacteristic;
  const value = target.value?.getUint8(0);
  if (value !== undefined) {
    console.log("Nuevo valor de la característica:", value);
  }
}

// Función para escribir datos en la característica
async function writeBluetooth(data: Uint8Array) {
  if (!characteristic) {
    console.error("No hay característica para escribir.");
    return;
  }

  try {
    await characteristic.writeValue(data);
    console.log("Datos enviados:", data);
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
}

// Función para desconectar el dispositivo
async function disconnectBluetooth() {
  if (device && device.gatt?.connected) {
    device.gatt.disconnect();
    console.log("Dispositivo desconectado.");
  }
}

// Ejemplo de uso de la función
connectBluetooth();
