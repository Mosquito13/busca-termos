import actionTypes from '../constants/actionTypes';
import storageUtils from '../utils/storageUtils';
import { languageMapping } from '../mapping/languages';

const translationInitial = {};

Object.values(languageMapping).forEach(({ id }) => translationInitial[id] = true);

const initial = {
  /* internal controls */
  valid: true,
  validating: false,
  languageFolderError: '',
  /* saved settings */
  languageFolder: '',
  mainLanguage: languageMapping.BRAZIL.id,
  translation: translationInitial,
  compactLayout: false,
  darkTheme: true
};

const getNewSettings = (state, values) => {
  const { languageFolder, mainLanguage, translation, compactLayout, darkTheme } = state;
  const currentSettings = {
    languageFolder,
    compactLayout,
    mainLanguage,
    translation,
    darkTheme
  };

  return {
    ...currentSettings,
    ...values
  };
};

const settingsReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_VALID:
      return { ...state, valid: action.value };

    case actionTypes.SET_VALIDATING:
      return { ...state, validating: action.value };

    case actionTypes.SET_MAIN_LANGUAGE:
      return { ...state, mainLanguage: action.value };

    case actionTypes.TOGGLE_COMPACT_LAYOUT:
      return { ...state, compactLayout: action.value };

    case actionTypes.TOGGLE_DARK_THEME:
      return { ...state, darkTheme: action.value };

    case actionTypes.TOGGLE_TRANSLATION:
      return {
        ...state,
        translation: {
          ...state.translation,
          [action.id]: action.value
        }
      };

    case actionTypes.SET_LANGUAGE_FOLDER:
      return { ...state, languageFolder: action.value };

    case actionTypes.SET_LANGUAGE_FOLDER_ERROR:
      return { ...state, languageFolderError: action.value };

    case actionTypes.SET_SETTINGS:
      return { ...state, ...getNewSettings(state, action.value) };

    case actionTypes.SAVE:
      storageUtils.setSettings(getNewSettings(state, action.values));
      return { ...state, languageFolderError: '' };

    default:
      return state;
  }
};

export default settingsReducer;
