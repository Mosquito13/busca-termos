const ipcRenderer = {
  send: jest.fn(),
  on: jest.fn()
};

const shell = {
  openExternal: jest.fn()
};

exports.ipcRenderer = ipcRenderer;
exports.shell = shell;