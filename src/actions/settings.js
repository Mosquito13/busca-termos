import apiUtils from '../utils/apiUtils';
import actionTypes from '../constants/actionTypes';
import storageUtils from '../utils/storageUtils';
import { loadData, setLoading } from './core';

export const setValid = (value) => ({
  type: actionTypes.SET_VALID,
  value
});

export const setValidating = (value) => ({
  type: actionTypes.SET_VALIDATING,
  value
});

export const setLanguageFolder = (value) => ({
  type: actionTypes.SET_LANGUAGE_FOLDER,
  value
});

export const setLanguageFolderError = (value) => ({
  type: actionTypes.SET_LANGUAGE_FOLDER_ERROR,
  value
});

export const setMainLanguage = (value) => ({
  type: actionTypes.SET_MAIN_LANGUAGE,
  value
});

export const toggleTranslation = (id, value) => ({
  type: actionTypes.TOGGLE_TRANSLATION,
  id,
  value
});

export const toggleCompactLayout = (value) => ({
  type: actionTypes.TOGGLE_COMPACT_LAYOUT,
  value
});

export const toggleDarkTheme = (value) => ({
  type: actionTypes.TOGGLE_DARK_THEME,
  value
});

export const setSettings = (value) => ({
  type: actionTypes.SET_SETTINGS,
  value
});

export const setTranslationColumns = (value) => ({
  type: actionTypes.SET_TRANSLATION_COLUMNS,
  value
});

export const validateAndSaveFirstSettings = (languageFolder) => async (dispatch) => {
  dispatch(setValidating(true));

  const isValid = await apiUtils.validateLanguageFolder(languageFolder);

  if (!isValid) {
    dispatch(setLanguageFolderError('Caminho inválido.'));
    dispatch(setValid(false));
  } else {
    dispatch(setLoading(true));
    dispatch(setValid(true));
    dispatch(saveSettings({ languageFolder }));
  }

  dispatch(setValidating(false));
};

export const loadSettings = () => async (dispatch) => {
  const settings = storageUtils.getSettings();
  const isValid = await apiUtils.validateLanguageFolder(
    settings?.languageFolder
  );

  if (!isValid) {
    dispatch(setValid(false));
    dispatch(setLoading(false));
  } else {
    dispatch(setSettings(settings));
    dispatch(loadData(settings));
  }

  apiUtils.closeSplashAndShowApp();
};

export const saveSettings = (values) => ({
  type: actionTypes.SAVE,
  values
});
