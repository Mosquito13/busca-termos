import actionTypes from '../constants/actionTypes';
import coreSelectors from '../selectors/core';

export const setTranslation = (id, value) => ({
  type: actionTypes.SET_TRANSLATION,
  id,
  value
});

export const loadTranslation = (id, termId) => (dispatch, getState) => {
  const state = getState();
  const data = coreSelectors.getData(state);
  const translation = data[id].find((d) => d.id === termId);

  dispatch(setTranslation(id, translation?.content));
};
