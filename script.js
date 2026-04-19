let device, server, service, characteristic;

const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const CHARACTERISTIC_UUID = "abcdefab-1234-1234-1234-abcdefabcdef";

async function connectESP32() {
  try {
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID]
    });

    server = await device.gatt.connect();
    service = await server.getPrimaryService(SERVICE_UUID);
    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    alert("Connected!");
  } catch (error) {
    console.error(error);
    alert("Connection failed");
  }
}

async function startReading() {
  await characteristic.startNotifications();

  characteristic.addEventListener('characteristicvaluechanged', (event) => {
    const value = new TextDecoder().decode(event.target.value);
    document.getElementById("output").innerText = value;
  });
}
