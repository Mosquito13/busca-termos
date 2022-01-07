const getSlice = state => state.Core;

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

  getSelectedItemId(state) {
    return getSlice(state).selectedItemId;
  }
};

export default coreSelectors;