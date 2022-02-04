import axios from 'axios';

import actionTypes from '../constants/actionTypes';
import releaseUtils from '../utils/releaseUtils';
import coreSelectors from '../selectors/core';
import apiUtils from '../utils/apiUtils';
import url from '../constants/url';

export const setLoading = (loading) => ({
  type: actionTypes.SET_LOADING,
  loading
});

export const setData = (data) => ({
  type: actionTypes.SET_DATA,
  data
});

export const setSelectedItemId = (id) => ({
  type: actionTypes.SET_SELECTED_ITEM_ID,
  id
});

export const setFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  filter
});

export const setAppVersion = (version) => ({
  type: actionTypes.SET_APP_VERSION,
  version
});

export const setAppHasUpdate = (appHasUpdate, updateURL) => ({
  type: actionTypes.SET_APP_HAS_UPDATE,
  appHasUpdate,
  updateURL
});

export const checkForUpdates =
  (currentVersion) => async (dispatch, getState) => {
    const state = getState();
    const hasUpdate = coreSelectors.getAppHasUpdate(state);

    if (hasUpdate === null) {
      const releases = await axios.get(url.LIST_APP_RELEASES);
      const [latestReleaseVersion, latestReleaseURL] =
        releaseUtils.parseLastRelease(releases);

      const hasUpdate = releaseUtils.hasUpdate(
        currentVersion,
        latestReleaseVersion
      );

      dispatch(setAppHasUpdate(hasUpdate, latestReleaseURL));
    }
  };

export const loadData = (settings) => async (dispatch) => {
  const data = await apiUtils.loadData(settings?.languageFolder);
  const appVersion = await apiUtils.loadAppVersion();

  dispatch(setAppVersion(appVersion));
  dispatch(checkForUpdates(appVersion));
  dispatch(setData(data));
  dispatch(setLoading(false));
};

export const openBrowserWithURL = (url) => async () => {
  apiUtils.openBrowserWithURL(url);
};
