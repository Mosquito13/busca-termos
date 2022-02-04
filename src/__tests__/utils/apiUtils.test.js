import apiUtils from '../../utils/apiUtils';

describe('apiUtils tests', () => {
  it('should call loadAppVersion', async () => {
    await apiUtils.loadAppVersion();
    expect(global.API.loadAppVersion).toBeCalledTimes(1);
  });

  it('should call validateLanguageFolder', async () => {
    await apiUtils.validateLanguageFolder('a/folder');
    expect(global.API.validateLanguageFolder).toBeCalledTimes(1);
    expect(global.API.validateLanguageFolder).toBeCalledWith('a/folder');
  });

  it('should call loadData', async () => {
    await apiUtils.loadData('settings');
    expect(global.API.loadData).toBeCalledTimes(1);
    expect(global.API.loadData).toBeCalledWith('settings');
  });

  it('should call minimize', async () => {
    await apiUtils.minimize();
    expect(global.API.minimize).toBeCalledTimes(1);
  });

  it('should call maximize', async () => {
    await apiUtils.maximize();
    expect(global.API.maximize).toBeCalledTimes(1);
  });

  it('should call unmaximize', async () => {
    await apiUtils.unmaximize();
    expect(global.API.unmaximize).toBeCalledTimes(1);
  });

  it('should call close', async () => {
    await apiUtils.close();
    expect(global.API.close).toBeCalledTimes(1);
  });

  it('should call registerMaximizeListener', async () => {
    const cb = jest.fn();

    await apiUtils.registerMaximizeListener(cb);
    expect(global.API.registerMaximizeListener).toBeCalledTimes(1);
    expect(global.API.registerMaximizeListener).toBeCalledWith(cb);
  });

  it('should call registerUnmaximizeListener', async () => {
    const cb = jest.fn();

    await apiUtils.registerUnmaximizeListener(cb);
    expect(global.API.registerUnmaximizeListener).toBeCalledTimes(1);
    expect(global.API.registerUnmaximizeListener).toBeCalledWith(cb);
  });

  it('should call closeSplashAndShowApp', async () => {
    await apiUtils.closeSplashAndShowApp();
    expect(global.API.closeSplashAndShowApp).toBeCalledTimes(1);
  });

  it('should call openBrowserWithURL', async () => {
    await apiUtils.openBrowserWithURL('anURL');
    expect(global.API.openBrowserWithURL).toBeCalledTimes(1);
    expect(global.API.openBrowserWithURL).toBeCalledWith('anURL');
  });
});
