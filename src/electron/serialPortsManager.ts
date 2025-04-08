import { SerialPort } from 'serialport';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';

type SerialPortInfo = Awaited<ReturnType<typeof SerialPort.list>>[number];

const POLLING_INTERVAL = 2000;

export function pollSerialPorts(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const serialPorts: SerialPortInfo[] = await getSerialPorts();
    ipcWebContentsSend('serialPorts', mainWindow.webContents, serialPorts);
  }, POLLING_INTERVAL);
}

async function getSerialPorts(): Promise<SerialPortInfo[]> {
  return await SerialPort.list();
}
