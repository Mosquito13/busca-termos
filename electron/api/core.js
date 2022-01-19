const fs = require('fs').promises;
const path = require('path');
const { shell } = require('electron');

const { parseAll } = require('../languageFileParser');
const languages = require('../constants/languages');

const baseDir = process.cwd();

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
    const version = await fs.readFile(path.join(baseDir, 'version'));

    return version.toString();
  },

  async openBrowserWithURL(url) {
    shell.openExternal(url);
  }
};