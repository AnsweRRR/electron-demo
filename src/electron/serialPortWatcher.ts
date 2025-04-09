import { SerialPort } from 'serialport';
import { ipcMain } from 'electron';

export function watchSerialPort(portPath: string, baudRate = 9600, mainWindow?: Electron.BrowserWindow) {
  const port = new SerialPort({
    path: portPath,
    baudRate: baudRate,
    autoOpen: false,
  });

  port.open((err) => {
    if (err) {
      console.error(`Hiba a port (${portPath}) megnyitásakor:`, err.message);
      return;
    }
    console.log(`Kapcsolódva a(z) ${portPath} porthoz`);
  });

  port.on('data', (data) => {
    const dataString = data.toString();
    console.log(`Adat érkezett a(z) ${portPath} portra:`, dataString);
    
    // Küldés a főprocessznek, ami továbbítja a Reactnek
    if (mainWindow) {
      mainWindow.webContents.send('serialData', dataString);
    }
  });

  port.on('error', (err) => {
    console.error(`Hiba a(z) ${portPath} porton:`, err.message);
  });

  port.on('close', () => {
    console.log(`A(z) ${portPath} port lezárult`);
  });
}