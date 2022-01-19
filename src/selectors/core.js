const getSlice = (state) => state.Core;

const coreSelectors = {
  isLoading(state) {
    return getSlice(state).loading;
  },

  getData(state) {
    return getSlice(state).data;
  },

  getFilter(state) {
    return getSlice(state).filter;
  },

  getAppVersion(state) {
    return getSlice(state).version;
  },

  getAppHasUpdate(state) {
    return getSlice(state).appHasUpdate;
  },

  getUpdateURL(state) {
    return getSlice(state).updateURL;
  },

  getSelectedItemId(state) {
    return getSlice(state).selectedItemId;
  }
};

export default coreSelectors;
