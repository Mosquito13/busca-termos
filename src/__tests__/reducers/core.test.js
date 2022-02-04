import coreReducers from '../../reducers/core';
import actionTypes from '../../constants/actionTypes';

import dataMock from '../../dataMock';

describe('core reducers tests', () => {
  let state;

  it('should set initial state', () => {
    state = coreReducers();

    expect(state).toMatchObject({
      loading: true,
      data: null,
      filter: '',
      selectedItemId: null,
      version: '',
      appHasUpdate: null,
      updateURL: ''
    });
  });

  it('should set loading', () => {
    state = coreReducers(state, {
      type: actionTypes.SET_LOADING,
      loading: false
    });

    expect(state.loading).toBeFalsy();
  });

  it('should set data', () => {
    state = coreReducers(state, {
      type: actionTypes.SET_DATA,
      data: dataMock
    });

    expect(state.data).toMatchObject(dataMock);
  });

  it('should set filter', () => {
    state = coreReducers(state, {
      type: actionTypes.SET_FILTER,
      filter: 'a filter'
    });

    expect(state.filter).toBe('a filter');
  });

  it('should set app version', () => {
    state = coreReducers(state, {
      type: actionTypes.SET_APP_VERSION,
      version: '1.6.9'
    });

    expect(state.version).toBe('1.6.9');
  });

  it('should set app has update', () => {
    state = coreReducers(state, {
      type: actionTypes.SET_APP_HAS_UPDATE,
      appHasUpdate: true,
      updateURL: 'an url'
    });

    expect(state.appHasUpdate).toBeTruthy();
    expect(state.updateURL).toBe('an url');
  });

  it('should set selected item id', () => {
    state = coreReducers(state, {
      type: actionTypes.SET_SELECTED_ITEM_ID,
      id: 'an id'
    });

    expect(state.selectedItemId).toBe('an id');
  });
});
