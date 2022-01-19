import axios from 'axios';

import actionTypes from '../constants/actionTypes';
import releaseUtils from '../utils/releaseUtils';
import coreSelectors from '../selectors/core';
import apiUtils from '../utils/apiUtils';
import url from '../constants/url';

const coreActions = {
  setLoading(loading) {
    return {
      type: actionTypes.SET_LOADING,
      loading
    };
  },

  setData(data) {
    return {
      type: actionTypes.SET_DATA,
      data
    };
  },

  setSelectedItemId(id) {
    return {
      type: actionTypes.SET_SELECTED_ITEM_ID,
      id
    };
  },

  setFilter(filter) {
    return {
      type: actionTypes.SET_FILTER,
      filter
    };
  },

  setAppVersion(version) {
    return {
      type: actionTypes.SET_APP_VERSION,
      version
    };
  },

  setAppHasUpdate(appHasUpdate, updateURL) {
    return {
      type: actionTypes.SET_APP_HAS_UPDATE,
      appHasUpdate,
      updateURL
    };
  },

  checkForUpdates(currentVersion) {
    return async (dispatch, getState) => {
      const state = getState();
      const hasUpdate = coreSelectors.getAppHasUpdate(state);

      if (hasUpdate === null) {
        const releases = await axios.get(url.LIST_APP_RELEASES);
        const [latestReleaseVersion, latestReleaseURL] = releaseUtils.parseLastRelease(releases);

        const hasUpdate = releaseUtils.hasUpdate(currentVersion, latestReleaseVersion);

        dispatch(this.setAppHasUpdate(hasUpdate, latestReleaseURL));
      }
    };
  },

  loadData(settings) {
    return async (dispatch) => {
      const data = await apiUtils.loadData(settings?.languageFolder);
      const appVersion = await apiUtils.loadAppVersion();

      dispatch(this.setAppVersion(appVersion));
      dispatch(this.checkForUpdates(appVersion));
      dispatch(this.setData(data));
      dispatch(this.setLoading(false));
    };
  },

  openBrowserWithURL(url) {
    return async () => {
      apiUtils.openBrowserWithURL(url);
    };
  }
};

export default coreActions;
