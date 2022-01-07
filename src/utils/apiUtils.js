const apiUtils = {
  async validateLanguageFolder(folder) {
    const isValid = await window.API.validateLanguageFolder(folder);

    return isValid;
  },

  async loadData(settings) {
    return await window.API.loadData(settings);
  },

  async minimize() {
    window.API.minimize();
  },

  async maximize() {
    window.API.maximize();
  },

  async unmaximize() {
    window.API.unmaximize();
  },

  async close() {
    window.API.close();
  }
};

export default apiUtils;