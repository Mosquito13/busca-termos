const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

let appWindow = null;

const appIcon = path.join(__dirname, 'assets', 'img', 'icon32.png');
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  const createWindow = () => {
    const windowState = windowStateKeeper({
      defaultHeight: 750,
      defaultWidth: 900,
      fullScreen: false,
      maximize: false
    });

    const win = new BrowserWindow({
      height: windowState.height,
      width: windowState.width,
      x: windowState.x,
      y: windowState.y,
      minWidth: 900,
      minHeight: 650,
      frame: false,
      show: false,
      icon: appIcon,
      title: 'Busca Termos',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    if (isDev) {
      win.loadURL('http://localhost:3000');
      win.webContents.openDevTools({ mode: 'detach' });
    } else {
      win.loadFile('./build/index.html');
    }

    win.setMenu(null);
    win.on('maximize', () => win.webContents.send('maximize'));
    win.on('unmaximize', () => win.webContents.send('unmaximize'));
    win.on('system-context-menu', (e) => e.preventDefault());

    windowState.manage(win);

    return win;
  };

  app.on('second-instance', () => {
    if (appWindow) {
      if (appWindow.isMinimized()) {
        appWindow.restore();
      }

      appWindow.focus();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.whenReady().then(() => {
    appWindow = createWindow();

    appWindow.once('ready-to-show', () => {
      appWindow.show();
    });
  });
}

ipcMain.on('close', () => appWindow.close());
ipcMain.on('minimize', () => appWindow.minimize());
ipcMain.on('maximize', () => appWindow.maximize());
ipcMain.on('unmaximize', () => appWindow.unmaximize());
