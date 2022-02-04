import axios from 'axios';

import {
  checkForUpdates,
  loadData,
  openBrowserWithURL,
  setAppHasUpdate,
  setAppVersion,
  setData,
  setFilter,
  setLoading,
  setSelectedItemId
} from '../../actions/core';
import actionTypes from '../../constants/actionTypes';
import apiUtils from '../../utils/apiUtils';

describe('core actions tests', () => {
  let dispatchMock;

  beforeAll(() => {
    dispatchMock = jest.fn();

    jest.spyOn(axios, 'get');
    jest.spyOn(apiUtils, 'loadData');
    jest.spyOn(apiUtils, 'loadAppVersion');
    jest.spyOn(apiUtils, 'openBrowserWithURL');
  });

  it('should create action set loading', () => {
    expect(setLoading(true)).toMatchObject({
      type: actionTypes.SET_LOADING,
      loading: true
    });
  });

  it('should create action set data', () => {
    expect(setData('any kind of data')).toMatchObject({
      type: actionTypes.SET_DATA,
      data: 'any kind of data'
    });
  });

  it('should create action set selected item id', () => {
    expect(setSelectedItemId('an id')).toMatchObject({
      type: actionTypes.SET_SELECTED_ITEM_ID,
      id: 'an id'
    });
  });

  it('should create action set filter', () => {
    expect(setFilter('newFilter')).toMatchObject({
      type: actionTypes.SET_FILTER,
      filter: 'newFilter'
    });
  });

  it('should create action set app version', () => {
    expect(setAppVersion('1.4.5')).toMatchObject({
      type: actionTypes.SET_APP_VERSION,
      version: '1.4.5'
    });
  });

  it('should create action set app has update', () => {
    expect(setAppHasUpdate(true, 'an/url')).toMatchObject({
      type: actionTypes.SET_APP_HAS_UPDATE,
      appHasUpdate: true,
      updateURL: 'an/url'
    });
  });

  describe('checkForUpdates', () => {
    it('should not dispatch when already verified once', async () => {
      const getStateMock = jest.fn().mockReturnValue({
        Core: {
          appHasUpdate: true
        }
      });

      await checkForUpdates('1.0.0')(dispatchMock, getStateMock);

      expect(axios.get).toBeCalledTimes(0);
      expect(dispatchMock).toBeCalledTimes(0);
    });

    it('should fetch releases and set false if is updated', async () => {
      const getStateMock = jest.fn().mockReturnValue({
        Core: {
          appHasUpdate: null
        }
      });

      axios.get.mockReturnValue({
        data: [
          {
            tag_name: '1.0.0',
            html_url: 'url/1.0.0'
          }
        ]
      });

      await checkForUpdates('1.0.0')(dispatchMock, getStateMock);

      expect(axios.get).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(setAppHasUpdate(false, 'url/1.0.0'));
    });
  });

  it('should load data and set all', async () => {
    const settingsMock = {
      languageFolder: 'a/folder',
      compactLayout: false,
      darkTheme: true
    };

    apiUtils.loadData.mockReturnValue(settingsMock);
    apiUtils.loadAppVersion.mockReturnValue('1.2.3');

    await loadData()(dispatchMock);

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).nthCalledWith(1, setAppVersion('1.2.3'));
    expect(dispatchMock).nthCalledWith(3, setData(settingsMock));
    expect(dispatchMock).nthCalledWith(4, setLoading(false));
  });

  it('should open browser by API', async () => {
    await openBrowserWithURL('a/URL')();

    expect(apiUtils.openBrowserWithURL).toBeCalledWith('a/URL');
  });
});
