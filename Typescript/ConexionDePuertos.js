var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var device = null;
var server = null;
var characteristic = null;
// Función para conectar el dispositivo Bluetooth
function connectBluetooth() {
    return __awaiter(this, void 0, void 0, function () {
        var service, value, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, navigator.bluetooth.requestDevice({
                            filters: [{ services: ['battery_service'] }], // Puedes cambiar 'battery_service' por el UUID de tu servicio
                            optionalServices: ['device_information'] // Incluye servicios opcionales
                        })];
                case 1:
                    // 1. Solicita el dispositivo Bluetooth con los servicios que necesitas
                    device = _b.sent();
                    if (!device) {
                        console.log("No se seleccionó ningún dispositivo.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ((_a = device.gatt) === null || _a === void 0 ? void 0 : _a.connect())];
                case 2:
                    // 2. Conéctate al servidor GATT del dispositivo
                    server = _b.sent();
                    if (!server) {
                        console.error("No se pudo conectar al servidor GATT.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, server.getPrimaryService('battery_service')];
                case 3:
                    service = _b.sent();
                    return [4 /*yield*/, service.getCharacteristic('battery_level')];
                case 4:
                    characteristic = _b.sent(); // Cambia a la característica que necesites
                    return [4 /*yield*/, characteristic.readValue()];
                case 5:
                    value = _b.sent();
                    console.log("Nivel de batería:", value.getUint8(0));
                    // 5. Configura una función de escucha para cuando cambie el valor
                    characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
                    return [4 /*yield*/, characteristic.startNotifications()];
                case 6:
                    _b.sent();
                    console.log("Conectado al dispositivo Bluetooth.");
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    console.error("Error al conectar el dispositivo Bluetooth:", error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Función para manejar los cambios en el valor de la característica
function handleCharacteristicValueChanged(event) {
    var _a;
    var target = event.target;
    var value = (_a = target.value) === null || _a === void 0 ? void 0 : _a.getUint8(0);
    if (value !== undefined) {
        console.log("Nuevo valor de la característica:", value);
    }
}
// Función para escribir datos en la característica
function writeBluetooth(data) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!characteristic) {
                        console.error("No hay característica para escribir.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, characteristic.writeValue(data)];
                case 2:
                    _a.sent();
                    console.log("Datos enviados:", data);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error al enviar datos:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Función para desconectar el dispositivo
function disconnectBluetooth() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            if (device && ((_a = device.gatt) === null || _a === void 0 ? void 0 : _a.connected)) {
                device.gatt.disconnect();
                console.log("Dispositivo desconectado.");
            }
            return [2 /*return*/];
        });
    });
}
// Ejemplo de uso de la función
connectBluetooth();
