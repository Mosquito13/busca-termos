import actionTypes from '../constants/actionTypes';
import apiUtils from '../utils/apiUtils';

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

  loadData(settings) {
    return async (dispatch) => {
      const data = await apiUtils.loadData(settings?.languageFolder);

      dispatch(this.setData(data));
      dispatch(this.setLoading(false));
    };
  }
};

export default coreActions;
