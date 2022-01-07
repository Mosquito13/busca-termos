const fs = require('fs').promises;

const { parseAll } = require('../languageFileParser');
const languages = require('../constants/languages');

module.exports = {
  async validateLanguageFolder(folder) {
    try {
      await fs.access(`${folder}/sesuite.${languages.BRAZIL}.utf-8.inc`);
      return true;
    } catch {
      return false;
    }
  },

  async loadData(folder) {
    return await parseAll(folder);
  }
};