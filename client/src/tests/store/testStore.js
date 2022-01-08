import { createStore, applyMiddleware } from 'redux';
import configureStore from 'redux-mock-store';
import rootReducer from '../../reducers';
import thunk from 'redux-thunk';

export function createTestStore(options) {

  const middleware = [thunk];
  let store;

  if (options && options.mockStore) {
    store = configureStore(middleware)(options.initialState || {});
    store.dispatch = jest.fn(store.dispatch);
  } else {
    store = createStore(rootReducer, applyMiddleware(...middleware));
  }

  return store;
}