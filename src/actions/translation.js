import actionTypes from '../constants/actionTypes';
import coreSelectors from '../selectors/core';

const translationActions = {
  setTranslation(id, value) {
    return {
      type: actionTypes.SET_TRANSLATION,
      id,
      value
    };
  },

  loadTranslation(id, termId) {
    return (dispatch, getState) => {
      const state = getState();
      const data = coreSelectors.getData(state);
      const translation = data[id].find((d) => d.id === termId);

      dispatch(this.setTranslation(id, translation?.content));
    };
  }
};

export default translationActions;
