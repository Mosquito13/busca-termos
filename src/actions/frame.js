import actionTypes from '../constants/actionTypes';
import apiUtils from '../utils/apiUtils';

const frameActions = {
  setMaximized(value) {
    return {
      type: actionTypes.SET_MAXIMIZED,
      value
    };
  },

  close() {
    return () => apiUtils.close();
  },

  minimize() {
    return () => apiUtils.minimize();
  },

  maximize() {
    return (dispatch) => {
      dispatch(this.setMaximized(true));
      apiUtils.maximize();
    };
  },

  unmaximize() {
    return (dispatch) => {
      dispatch(this.setMaximized(false));
      apiUtils.unmaximize();
    };
  }
};

export default frameActions;
