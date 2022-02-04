import translationReducers from '../../reducers/translation';
import actionTypes from '../../constants/actionTypes';
import { languageMapping } from '../../mapping/languages';

describe('translation reducers tests', () => {
  let state;

  it('should set initial state', () => {
    state = translationReducers();

    expect(state).toMatchObject({});
  });

  it('should set translation', () => {
    state = translationReducers(state, {
      type: actionTypes.SET_TRANSLATION,
      id: languageMapping.CATALONIA.id,
      value: 'catalonia value'
    });

    expect(state[languageMapping.CATALONIA.id]).toBe('catalonia value');
  });
});
