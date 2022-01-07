const { contextBridge } = require('electron');

const languageApi = require('./api/language');
const frameApi = require('./api/frame');

contextBridge.exposeInMainWorld('API', {
  ...languageApi,
  ...frameApi
});