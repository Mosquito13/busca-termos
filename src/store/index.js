import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import coreReducer from '../reducers/core';
import frameReducer from '../reducers/frame';
import settingsReducer from '../reducers/settings';
import translationReducer from '../reducers/translation';

const configureStore = () => {
  const reducers = combineReducers({
    Core: coreReducer,
    Frame: frameReducer,
    Settings: settingsReducer,
    Translation: translationReducer
  });

  const middlewares = [thunkMiddleware];

  return createStore(reducers, applyMiddleware(...middlewares));
};

export default configureStore;
