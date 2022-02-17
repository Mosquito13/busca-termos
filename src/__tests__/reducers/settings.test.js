import settingsReducers from '../../reducers/settings';
import { languageMapping } from '../../mapping/languages';
import storageUtils from '../../utils/storageUtils';
import actionTypes from '../../constants/actionTypes';

describe('settings reducers tests', () => {
  let state;

  beforeAll(() => {
    jest.spyOn(storageUtils, 'setSettings');
  });

  it('should set initial state', () => {
    state = settingsReducers();

    expect(state).toMatchObject({
      valid: true,
      validating: false,
      languageFolderError: '',
      languageFolder: '',
      mainLanguage: languageMapping.BRAZIL.id,
      translation: {
        [languageMapping.BRAZIL.id]: true,
        [languageMapping.CATALONIA.id]: true,
        [languageMapping.CZECH.id]: true,
        [languageMapping.DENMARK.id]: true,
        [languageMapping.FINLAND.id]: true,
        [languageMapping.FRANCE.id]: true,
        [languageMapping.GERMANY.id]: true,
        [languageMapping.ITALY.id]: true,
        [languageMapping.POLAND.id]: true,
        [languageMapping.PORTUGAL.id]: true,
        [languageMapping.ROMANIA.id]: true,
        [languageMapping.RUSSIA.id]: true,
        [languageMapping.SLOVAKIA.id]: true,
        [languageMapping.SPAIN.id]: true,
        [languageMapping.TURKEY.id]: true,
        [languageMapping.USA.id]: true
      },
      translationColumns: 3,
      compactLayout: false,
      darkTheme: false
    });
  });

  it('should set valid', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_VALID,
      value: false
    });

    expect(state.valid).toBeFalsy();
  });

  it('should set validating', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_VALIDATING,
      value: true
    });

    expect(state.validating).toBeTruthy();
  });

  it('should set main language', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_MAIN_LANGUAGE,
      value: languageMapping.RUSSIA.id
    });

    expect(state.mainLanguage).toBe(languageMapping.RUSSIA.id);
  });

  it('should set compact layout', () => {
    state = settingsReducers(state, {
      type: actionTypes.TOGGLE_COMPACT_LAYOUT,
      value: true
    });

    expect(state.compactLayout).toBeTruthy();
  });

  it('should set dark theme', () => {
    state = settingsReducers(state, {
      type: actionTypes.TOGGLE_DARK_THEME,
      value: true
    });

    expect(state.darkTheme).toBeTruthy();
  });

  it('should toggle translation', () => {
    state = settingsReducers(state, {
      type: actionTypes.TOGGLE_TRANSLATION,
      id: languageMapping.FINLAND.id,
      value: false
    });

    expect(state.translation[languageMapping.FINLAND.id]).toBeFalsy();
  });

  it('should set translation columns', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_TRANSLATION_COLUMNS,
      value: 2
    });

    expect(state.translationColumns).toBe(2);
  });

  it('should set language folder', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_LANGUAGE_FOLDER,
      value: 'a/folder'
    });

    expect(state.languageFolder).toBe('a/folder');
  });

  it('should set language folder error', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_LANGUAGE_FOLDER_ERROR,
      value: 'an error'
    });

    expect(state.languageFolderError).toBe('an error');
  });

  it('should set multiple properties', () => {
    state = settingsReducers(state, {
      type: actionTypes.SET_SETTINGS,
      value: {
        compactLayout: false,
        languageFolder: 'another/folder'
      }
    });

    expect(state.compactLayout).toBeFalsy();
    expect(state.languageFolder).toBe('another/folder');
  });

  it('should save settings', () => {
    state = settingsReducers(state, {
      type: actionTypes.SAVE,
      values: {
        darkTheme: true,
        languageFolder: 'a/folder'
      }
    });

    expect(storageUtils.setSettings).toBeCalledTimes(1);
    expect(state.darkTheme).toBe(true);
    expect(state.languageFolder).toBe('a/folder');
    expect(state.languageFolderError).toBe('');
  });
});
