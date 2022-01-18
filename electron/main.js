const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

let appWindow = null;
let splashWindow = null;

const appIcon = path.join(__dirname, 'assets', 'img', 'icon32.png');
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  const createSplash = () => {
    const splashWin = new BrowserWindow({
      width: 300,
      height: 250,
      frame: false,
      transparent: true,
      alwaysOnTop: true
    });

    splashWin.loadFile('./electron/splash/index.html');
    splashWin.center();

    return splashWin;
  };

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
      title: 'BuscaTermos',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    if (isDev) {
      win.loadURL('http://localhost:3000');
      // win.webContents.openDevTools({ mode: 'detach' });
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
    splashWindow = createSplash();
    appWindow = createWindow();
  });
}

ipcMain.on('show-app', () => {
  if (splashWindow !== null) {
    splashWindow.close();
    splashWindow = null;

    appWindow.show();
  }
});

ipcMain.on('close', () => appWindow.close());
ipcMain.on('minimize', () => appWindow.minimize());
ipcMain.on('maximize', () => appWindow.maximize());
ipcMain.on('unmaximize', () => appWindow.unmaximize());
