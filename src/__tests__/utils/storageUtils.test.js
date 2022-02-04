import storageUtils, { STORAGE_KEY } from '../../utils/storageUtils';

const settingsMock = {
  path: 'a/path',
  darkTheme: true,
  compactLayout: false
};

describe('storageUtils tests', () => {
  it('should save settings to localStorage', () => {
    jest.spyOn(global.localStorage.__proto__, 'setItem');

    storageUtils.setSettings(settingsMock);

    expect(global.localStorage.__proto__.setItem).toBeCalledTimes(1);
    expect(global.localStorage.__proto__.setItem).toBeCalledWith(
      STORAGE_KEY,
      JSON.stringify(settingsMock)
    );
  });

  it('should return null if does not have saved settings', () => {
    jest.spyOn(global.localStorage.__proto__, 'getItem').mockReturnValue(null);

    expect(storageUtils.getSettings()).toBe(null);
  });

  it('should return parsed settings', () => {
    jest
      .spyOn(global.localStorage.__proto__, 'getItem')
      .mockReturnValue(JSON.stringify(settingsMock));

    const settings = storageUtils.getSettings();

    expect(settings.path).toBe(settingsMock.path);
    expect(settings.darkTheme).toBe(settingsMock.darkTheme);
    expect(settings.compactLayout).toBe(settingsMock.compactLayout);
  });
});
