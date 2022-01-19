const apiUtils = {
  async loadAppVersion() {
    return await window.API.loadAppVersion();
  },

  async validateLanguageFolder(folder) {
    return await window.API.validateLanguageFolder(folder);
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
  },

  async registerMaximizeListener(callback) {
    window.API.registerMaximizeListener(callback);
  },

  async registerUnmaximizeListener(callback) {
    window.API.registerUnmaximizeListener(callback);
  },

  async closeSplashAndShowApp() {
    window.API.closeSplashAndShowApp();
  },

  async openBrowserWithURL(url) {
    window.API.openBrowserWithURL(url);
  }
};

export default apiUtils;
