import actionTypes from '../constants/actionTypes';
import apiUtils from '../utils/apiUtils';

export const setMaximized = (value) => ({
  type: actionTypes.SET_MAXIMIZED,
  value
});

export const close = () => () => apiUtils.close();

export const minimize = () => () => apiUtils.minimize();

export const maximize = () => () => apiUtils.maximize();

export const unmaximize = () => () => apiUtils.unmaximize();

export const registerFrameListeners = () => (dispatch) => {
  apiUtils.registerMaximizeListener(() => {
    dispatch(setMaximized(true));
  });

  apiUtils.registerUnmaximizeListener(() => {
    dispatch(setMaximized(false));
  });
};
