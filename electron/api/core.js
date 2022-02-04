const fs = require('fs').promises;
const path = require('path');
const { ipcRenderer, shell } = require('electron');

const { parseAll } = require('../languageFileParser');
const languages = require('../constants/languages');

module.exports = {
  async validateLanguageFolder(folder) {
    try {
      await fs.access(path.join(folder, `sesuite.${languages.BRAZIL}.utf-8.inc`));
      return true;
    } catch {
      return false;
    }
  },

  async loadData(folder) {
    return await parseAll(folder);
  },

  async loadAppVersion() {
    return await ipcRenderer.invoke('getAppVersion');
  },

  async openBrowserWithURL(url) {
    shell.openExternal(url);
  }
};