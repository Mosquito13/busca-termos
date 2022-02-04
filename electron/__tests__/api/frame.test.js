const { ipcRenderer } = require('electron');

const frameApi = require('../../api/frame');

describe('API > Frame test', () => {
  it('should send show-app', () => {
    frameApi.closeSplashAndShowApp();

    expect(ipcRenderer.send).toBeCalledTimes(1);
    expect(ipcRenderer.send).toBeCalledWith('show-app');
  });

  it('should send close', () => {
    frameApi.close();

    expect(ipcRenderer.send).toBeCalledTimes(1);
    expect(ipcRenderer.send).toBeCalledWith('close');
  });

  it('should send minimize', () => {
    frameApi.minimize();

    expect(ipcRenderer.send).toBeCalledTimes(1);
    expect(ipcRenderer.send).toBeCalledWith('minimize');
  });

  it('should send maximize', () => {
    frameApi.maximize();

    expect(ipcRenderer.send).toBeCalledTimes(1);
    expect(ipcRenderer.send).toBeCalledWith('maximize');
  });

  it('should send unmaximize', () => {
    frameApi.unmaximize();

    expect(ipcRenderer.send).toBeCalledTimes(1);
    expect(ipcRenderer.send).toBeCalledWith('unmaximize');
  });

  it('should register maximize listener and call it on event', () => {
    const listener = jest.fn();

    frameApi.registerMaximizeListener(listener);

    expect(listener).toBeCalledTimes(0);
    expect(ipcRenderer.on).toBeCalledTimes(1);
    expect(ipcRenderer.on.mock.calls[0][0]).toBe('maximize');

    ipcRenderer.on.mock.calls[0][1]();

    expect(listener).toBeCalledTimes(1);
  });

  it('should register unmaximize listener and call it on event', () => {
    const listener = jest.fn();

    frameApi.registerUnmaximizeListener(listener);

    expect(listener).toBeCalledTimes(0);
    expect(ipcRenderer.on).toBeCalledTimes(1);
    expect(ipcRenderer.on.mock.calls[0][0]).toBe('unmaximize');

    ipcRenderer.on.mock.calls[0][1]();

    expect(listener).toBeCalledTimes(1);
  });
});
