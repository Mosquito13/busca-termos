import frameReducers from '../../reducers/frame';
import actionTypes from '../../constants/actionTypes';

describe('frame reducers tests', () => {
  let state;

  it('should set initial state', () => {
    state = frameReducers();

    expect(state).toMatchObject({
      maximized: false
    });
  });

  it('should set maximized', () => {
    state = frameReducers(state, {
      type: actionTypes.SET_MAXIMIZED,
      value: true
    });

    expect(state.maximized).toBeTruthy();
  });
});
