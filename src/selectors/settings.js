const getSlice = (state) => state.Settings;

const settingsSelectors = {
  isValid(state) {
    return getSlice(state).valid;
  },

  isValidating(state) {
    return getSlice(state).validating;
  },

  isDarkTheme(state) {
    return getSlice(state).darkTheme;
  },

  isCompactLayout(state) {
    return getSlice(state).compactLayout;
  },

  getMainLanguage(state) {
    return getSlice(state).mainLanguage;
  },

  getTranslation(state) {
    return getSlice(state).translation;
  },

  getLanguageFolder(state) {
    return getSlice(state).languageFolder;
  },

  getLanguageFolderError(state) {
    return getSlice(state).languageFolderError;
  }
};

export default settingsSelectors;
