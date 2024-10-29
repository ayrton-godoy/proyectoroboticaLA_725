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
// Elementos HTML
var connectButton = document.getElementById("connect-btn");
var analyzeButton = document.getElementById("analyze-btn");
var closeButton = document.getElementById("close-btn"); // Nuevo botón
var statusMessage = document.getElementById("status-message");
var device = null;
var server = null;
var characteristic = null;
// Función para conectar al dispositivo Bluetooth
function connectBluetooth() {
    return __awaiter(this, void 0, void 0, function () {
        var service, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    statusMessage.textContent = "Conectando...";
                    return [4 /*yield*/, navigator.bluetooth.requestDevice({
                            filters: [{ services: ['battery_service'] }]
                        })];
                case 1:
                    device = _a.sent();
                    if (!device) {
                        statusMessage.textContent = "Dispositivo no seleccionado.";
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, server.getPrimaryService('battery_service')];
                case 2:
                    service = _a.sent();
                    return [4 /*yield*/, service.getCharacteristic('battery_level')];
                case 3:
                    characteristic = _a.sent();
                    statusMessage.textContent = "Dispositivo conectado. Listo para analizar.";
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error en la conexión Bluetooth:", error_1);
                    statusMessage.textContent = "Error en la conexión.";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Función para iniciar el análisis de calidad de aire
function startAnalysis() {
    return __awaiter(this, void 0, void 0, function () {
        var value, batteryLevel, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!characteristic) {
                        statusMessage.textContent = "Por favor, conecta un dispositivo primero.";
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    statusMessage.textContent = "Analizando...";
                    return [4 /*yield*/, characteristic.readValue()];
                case 2:
                    value = _a.sent();
                    batteryLevel = value.getUint8(0);
                    statusMessage.textContent = "Nivel de bater\u00EDa: ".concat(batteryLevel, "%");
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error en el análisis:", error_2);
                    statusMessage.textContent = "Error en el análisis.";
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Función para cerrar la pestaña
function closeTab() {
    window.close(); // Cierra la pestaña
}
// Event listeners para los botones
connectButton.addEventListener("click", connectBluetooth);
analyzeButton.addEventListener("click", startAnalysis);
closeButton.addEventListener("click", closeTab); // Agrega el event listener para cerrar la pestaña
