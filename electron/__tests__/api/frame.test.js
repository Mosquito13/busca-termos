const { ipcRenderer } = require('electron');

const frameApi = require('../../api/frame');

describe('API > Frame test', () => {
  it('should invoke close', () => {
    frameApi.close();

    expect(ipcRenderer.invoke).toBeCalledTimes(1);
    expect(ipcRenderer.invoke).toBeCalledWith('close');
  });
});
