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
    return () => apiUtils.maximize();
  },

  unmaximize() {
    return () => apiUtils.unmaximize();
  },

  registerFrameListeners() {
    return (dispatch) => {
      apiUtils.registerMaximizeListener(() => {
        dispatch(this.setMaximized(true));
      });

      apiUtils.registerUnmaximizeListener(() => {
        dispatch(this.setMaximized(false));
      });
    };
  }
};

export default frameActions;
