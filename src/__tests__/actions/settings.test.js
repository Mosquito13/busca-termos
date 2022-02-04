import {
  setLanguageFolder,
  setLanguageFolderError,
  setMainLanguage,
  setValid,
  setValidating,
  toggleTranslation,
  toggleCompactLayout,
  toggleDarkTheme,
  setSettings,
  validateAndSaveFirstSettings,
  saveSettings,
  loadSettings
} from '../../actions/settings';
import apiUtils from '../../utils/apiUtils';
import storageUtils from '../../utils/storageUtils';
import actionTypes from '../../constants/actionTypes';
import { languageMapping } from '../../mapping/languages';
import { setLoading } from '../../actions/core';

describe('settings actions tests', () => {
  let dispatchMock;

  beforeAll(() => {
    dispatchMock = jest.fn();

    jest.spyOn(apiUtils, 'validateLanguageFolder');
    jest.spyOn(apiUtils, 'closeSplashAndShowApp');
    jest.spyOn(storageUtils, 'getSettings');
  });

  it('should create action set valid', () => {
    expect(setValid(true)).toMatchObject({
      type: actionTypes.SET_VALID,
      value: true
    });
  });

  it('should create action set validating', () => {
    expect(setValidating(true)).toMatchObject({
      type: actionTypes.SET_VALIDATING,
      value: true
    });
  });

  it('should create action set language folder', () => {
    expect(setLanguageFolder('a/folder')).toMatchObject({
      type: actionTypes.SET_LANGUAGE_FOLDER,
      value: 'a/folder'
    });
  });

  it('should create action set language folder error', () => {
    expect(setLanguageFolderError('an error')).toMatchObject({
      type: actionTypes.SET_LANGUAGE_FOLDER_ERROR,
      value: 'an error'
    });
  });

  it('should create action set main language', () => {
    expect(setMainLanguage(languageMapping.CZECH.id)).toMatchObject({
      type: actionTypes.SET_MAIN_LANGUAGE,
      value: languageMapping.CZECH.id
    });
  });

  it('should create action toggle translation', () => {
    expect(toggleTranslation(languageMapping.ITALY.id, true)).toMatchObject({
      type: actionTypes.TOGGLE_TRANSLATION,
      id: languageMapping.ITALY.id,
      value: true
    });
  });

  it('should create action toggle compact layout', () => {
    expect(toggleCompactLayout(true)).toMatchObject({
      type: actionTypes.TOGGLE_COMPACT_LAYOUT,
      value: true
    });
  });

  it('should create action toggle dark theme', () => {
    expect(toggleDarkTheme(true)).toMatchObject({
      type: actionTypes.TOGGLE_DARK_THEME,
      value: true
    });
  });

  it('should create action set settings', () => {
    expect(setSettings('some settings')).toMatchObject({
      type: actionTypes.SET_SETTINGS,
      value: 'some settings'
    });
  });

  describe('validateAndSaveFirstSettings', () => {
    it('should set error when is not valid', async () => {
      apiUtils.validateLanguageFolder.mockReturnValue(false);

      await validateAndSaveFirstSettings('a/folder')(dispatchMock);

      expect(dispatchMock).toBeCalledTimes(4);
      expect(dispatchMock).nthCalledWith(1, setValidating(true));
      expect(dispatchMock).nthCalledWith(2, setLanguageFolderError('Caminho inválido.'));
      expect(dispatchMock).nthCalledWith(3, setValid(false));
      expect(dispatchMock).nthCalledWith(4, setValidating(false));
    });

    it('should set valid and save settings when is valid', async () => {
      apiUtils.validateLanguageFolder.mockReturnValue(true);

      await validateAndSaveFirstSettings('a/folder')(dispatchMock);

      expect(dispatchMock).toBeCalledTimes(5);
      expect(dispatchMock).nthCalledWith(1, setValidating(true));
      expect(dispatchMock).nthCalledWith(2, setLoading(true));
      expect(dispatchMock).nthCalledWith(3, setValid(true));
      expect(dispatchMock).nthCalledWith(4, saveSettings({ languageFolder: 'a/folder' }));
      expect(dispatchMock).nthCalledWith(5, setValidating(false));
    });
  });

  describe('loadSettings', () => {
    it('should set valid to false', async () => {
      apiUtils.validateLanguageFolder.mockReturnValue(false);

      await loadSettings()(dispatchMock);

      expect(dispatchMock).toBeCalledTimes(2);
      expect(dispatchMock).nthCalledWith(1, setValid(false));
      expect(dispatchMock).nthCalledWith(2, setLoading(false));
    });

    it('should set settings', async () => {
      storageUtils.getSettings.mockReturnValue({
        languageFolder: 'a/folder'
      });
      apiUtils.validateLanguageFolder.mockReturnValue(true);

      await loadSettings()(dispatchMock);

      expect(dispatchMock).toBeCalledTimes(2);
      expect(dispatchMock).nthCalledWith(1, setSettings({
        languageFolder: 'a/folder'
      }));
    });
  });
});
