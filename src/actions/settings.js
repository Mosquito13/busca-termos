import apiUtils from '../utils/apiUtils';
import actionTypes from '../constants/actionTypes';
import storageUtils from '../utils/storageUtils';
import coreActions from './core';

const settingsActions = {
  setValid(value) {
    return {
      type: actionTypes.SET_VALID,
      value
    };
  },

  setValidating(value) {
    return {
      type: actionTypes.SET_VALIDATING,
      value
    };
  },

  setLanguageFolder(value) {
    return {
      type: actionTypes.SET_LANGUAGE_FOLDER,
      value
    };
  },

  setLanguageFolderError(value) {
    return {
      type: actionTypes.SET_LANGUAGE_FOLDER_ERROR,
      value
    };
  },

  setMainLanguage(value) {
    return {
      type: actionTypes.SET_MAIN_LANGUAGE,
      value
    };
  },

  toggleTranslation(id, value) {
    return {
      type: actionTypes.TOGGLE_TRANSLATION,
      id,
      value
    };
  },

  toggleCompactLayout(value) {
    return {
      type: actionTypes.TOGGLE_COMPACT_LAYOUT,
      value
    };
  },

  toggleDarkTheme(value) {
    return {
      type: actionTypes.TOGGLE_DARK_THEME,
      value
    };
  },

  setSettings(value) {
    return {
      type: actionTypes.SET_SETTINGS,
      value
    };
  },

  validateAndSaveFirstSettings(languageFolder) {
    return async (dispatch) => {
      dispatch(this.setValidating(true));

      const isValid = await apiUtils.validateLanguageFolder(languageFolder);

      if (!isValid) {
        dispatch(this.setLanguageFolderError('Caminho inválido.'));
        dispatch(this.setValid(false));
      } else {
        dispatch(coreActions.setLoading(true));
        dispatch(this.setValid(true));
        dispatch(this.saveSettings({ languageFolder }));
      }

      dispatch(this.setValidating(false));
    };
  },

  loadSettings() {
    return async (dispatch) => {
      const settings = storageUtils.getSettings();
      const isValid = await apiUtils.validateLanguageFolder(settings?.languageFolder);

      if (!isValid) {
        dispatch(this.setValid(false));
        dispatch(coreActions.setLoading(false));
      } else {
        dispatch(this.setSettings(settings));
        dispatch(coreActions.loadData(settings));
      }
    };
  },

  saveSettings(values) {
    return {
      type: actionTypes.SAVE,
      values
    };
  }
};

export default settingsActions;
