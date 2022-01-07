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
  }
};
