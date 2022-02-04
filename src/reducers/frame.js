import actionTypes from '../constants/actionTypes';

const initial = {
  maximized: false
};

const frameReducer = (state = initial, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_MAXIMIZED:
      return { ...state, maximized: action.value };

    default:
      return state;
  }
};

export default frameReducer;
