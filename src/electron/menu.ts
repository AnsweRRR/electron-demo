import { BrowserWindow, Menu, app } from 'electron';
import { ipcWebContentsSend, isDev } from './util.js';

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === 'darwin' ? undefined : 'App',
        type: 'submenu',
        submenu: [
          {
            label: 'Quit',
            click: app.quit,
          },
          {
            label: 'DevTools',
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
        ],
      },
      {
        label: 'Functions',
        type: 'submenu',
        submenu: [
          {
            label: 'Resources',
            click: () => ipcWebContentsSend('changePage', mainWindow.webContents, '/app/resources'),
          },
          {
            label: 'SerialPorts',
            click: () => ipcWebContentsSend('changePage', mainWindow.webContents, '/app/serialPorts'),
          },
        ],
      },
      {
        label: 'Resources',
        type: 'submenu',
        submenu: [
          {
            label: 'CPU',
            click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'CPU'),
          },
          {
            label: 'RAM',
            click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'RAM'),
          },
          {
            label: 'STORAGE',
            click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'STORAGE'),
          },
        ],
      },
    ])
  );
}
