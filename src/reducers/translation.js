import actionTypes from '../constants/actionTypes';

const initial = {};

const translationReducer = (state = initial, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_TRANSLATION:
      return { ...state, [action.id]: action.value };

    default:
      return state;
  }
};

export default translationReducer;
