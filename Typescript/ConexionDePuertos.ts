navigator.serial.addEventListener("connect", (e) => {
  });
  
  navigator.serial.addEventListener("disconnect", (e) => {
  });
  
  navigator.serial.getPorts().then((ports) => {
  });
  
  button.addEventListener("click", () => {
    const usbVendorId = 0xabcd;
    navigator.serial
      .requestPort({ filters: [{ usbVendorId }] })
      .then((port) => {
      })
      .catch((e) => {
      });
  });
  