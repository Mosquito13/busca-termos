const { ipcRenderer } = require('electron');

module.exports = {
  close() {
    ipcRenderer.invoke('close');
  },

  minimize() {
    ipcRenderer.invoke('minimize');
  },

  maximize() {
    ipcRenderer.invoke('maximize');
  },

  unmaximize() {
    ipcRenderer.invoke('unmaximize');
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
