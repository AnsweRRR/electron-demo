import { SerialPort } from 'serialport';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';

const POLLING_INTERVAL = 2000;

export function pollSerialPorts(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const serialPorts : SerialPortInfo[] = await getSerialPorts();
    ipcWebContentsSend('serialPorts', mainWindow.webContents, serialPorts);
  }, POLLING_INTERVAL);
}

async function getSerialPorts() : Promise<SerialPortInfo[]> {
  const ports = await SerialPort.list();
  return ports.map(port => ({
    path: port.path,
    manufacturer: port.manufacturer || 'ismeretlen eszköz',
    serialNumber: port.serialNumber,
    vendorId: port.vendorId,
    productId: port.productId,
  }));
}
