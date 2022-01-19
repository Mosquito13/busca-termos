import actionTypes from '../constants/actionTypes';

const initial = {
  loading: true,
  data: null,
  filter: '',
  selectedItemId: null,
  version: '',
  appHasUpdate: null,
  updateURL: ''
};

const coreReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.loading };

    case actionTypes.SET_DATA:
      return { ...state, data: action.data };

    case actionTypes.SET_FILTER:
      return { ...state, filter: action.filter };

    case actionTypes.SET_APP_VERSION:
      return { ...state, version: action.version };

    case actionTypes.SET_APP_HAS_UPDATE:
      return { ...state, appHasUpdate: action.appHasUpdate, updateURL: action.updateURL };

    case actionTypes.SET_SELECTED_ITEM_ID:
      return { ...state, selectedItemId: action.id };

    default:
      return state;
  }
};

export default coreReducer;
