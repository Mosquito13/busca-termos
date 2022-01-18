const { ipcRenderer } = require('electron');

module.exports = {
  closeSplashAndShowApp() {
    ipcRenderer.send('show-app');
  },

  close() {
    ipcRenderer.send('close');
  },

  minimize() {
    ipcRenderer.send('minimize');
  },

  maximize() {
    ipcRenderer.send('maximize');
  },

  unmaximize() {
    ipcRenderer.send('unmaximize');
  },

  registerMaximizeListener(callback) {
    ipcRenderer.on('maximize', () => {
      callback();
    });
  },

  registerUnmaximizeListener(callback) {
    ipcRenderer.on('unmaximize', () => {
      callback();
    });
  }
};
