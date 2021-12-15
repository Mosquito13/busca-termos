const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

const createWindow = () => {
  const win = new BrowserWindow({
    show: false
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile('./build/index.html');
  }

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
