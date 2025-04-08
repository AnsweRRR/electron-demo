import { BrowserWindow, ipcMain } from "electron";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline"; // csak ha sortöréssel záruló sorokat vársz
import { ipcWebContentsSend } from "./util.js";

type SerialPortInfo = Awaited<ReturnType<typeof SerialPort.list>>[number];

const POLLING_INTERVAL = 2000;
const openPorts = new Map<string, SerialPort>(); // kulcs: path, érték: SerialPort példány

export function pollSerialPorts(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const serialPorts: SerialPortInfo[] = await SerialPort.list();
    ipcWebContentsSend("serialPorts", mainWindow.webContents, serialPorts);
  }, POLLING_INTERVAL);
}

export function setupSerialHandlers(mainWindow: BrowserWindow) {
  ipcMain.on("openSerialPort", (event, portPath: string) => {
    console.log("Serial port nyitása:", portPath);
    if (openPorts.has(portPath)) return;
  
    const port = new SerialPort({ path: portPath, baudRate: 9600 });
  
    const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  
    parser.on("data", (data: string) => {
      console.log("Adat jött:", data); // <-- EZ
      ipcWebContentsSend("serialPortData", mainWindow.webContents, {
        path: portPath,
        data,
      });
    });
  });  

  ipcMain.on("closeSerialPort", (event, portPath: string) => {
    const port = openPorts.get(portPath);
    if (port) {
      port.close();
      openPorts.delete(portPath);
    }
  });
}
