const STORAGE_KEY = 'BuscaTermos';

const storageUtils = {
  setSettings(values) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  },

  getSettings() {
    const item = localStorage.getItem(STORAGE_KEY);

    return item ? JSON.parse(item) : null;
  }
};

export { STORAGE_KEY };
export default storageUtils;
