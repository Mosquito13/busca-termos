const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const appIcon = path.join(__dirname, 'assets', 'img', 'icon32.png');



const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 1000,
    minWidth: 900,
    minHeight: 1000,
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

  return win;
};

app.whenReady().then(() => {
  const appWindow = createWindow();

  appWindow.once('ready-to-show', () => {
    appWindow.show();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('close', () => BrowserWindow.getFocusedWindow().close());
ipcMain.handle('minimize', () => BrowserWindow.getFocusedWindow().minimize());
ipcMain.handle('maximize', () => BrowserWindow.getFocusedWindow().maximize());
ipcMain.handle('unmaximize', () => BrowserWindow.getFocusedWindow().unmaximize());
