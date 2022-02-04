const fs = require('fs').promises;
const { shell } = require('electron');

jest.mock('../../languageFileParser');

const { parseAll } = require('../../languageFileParser');
const coreApi = require('../../api/core');

describe('API > Core test', () => {
  it('should return true if language folder is correct', async () => {
    jest.spyOn(fs, 'access').mockReturnValue(true);

    const response = await coreApi.validateLanguageFolder('folder');

    expect(response).toBeTruthy();
  });

  it('should return false if language folder is not correct', async () => {
    jest.spyOn(fs, 'access').mockRejectedValue(new Error('an error'));

    const response = await coreApi.validateLanguageFolder('folder');

    expect(response).toBeFalsy();
  });

  it('should call parseAll from parser when load', async () => {
    parseAll.mockReturnValue('values');

    const response = await coreApi.loadData();

    expect(response).toBe('values');
  });

  it('should load app version', async () => {
    jest.spyOn(fs, 'readFile').mockReturnValue('1.0.0');

    const response = await coreApi.loadAppVersion();

    expect(response).toBe('1.0.0');
  });

  it('should open url', () => {
    coreApi.openBrowserWithURL('an url');

    expect(shell.openExternal).toBeCalledTimes(1);
    expect(shell.openExternal).toBeCalledWith('an url');
  });
});
