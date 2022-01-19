const { contextBridge } = require('electron');

const coreApi = require('./api/core');
const frameApi = require('./api/frame');

contextBridge.exposeInMainWorld('API', {
  ...coreApi,
  ...frameApi
});