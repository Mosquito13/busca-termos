const { ipcRenderer } = require('electron');

const frameApi = require('../../api/frame');

describe('API > Frame test', () => {
  it('should send close', () => {
    frameApi.close();

    expect(ipcRenderer.send).toBeCalledTimes(1);
    expect(ipcRenderer.send).toBeCalledWith('close');
  });
});
