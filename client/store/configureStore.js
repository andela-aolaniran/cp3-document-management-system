import reduxImmutableStateVariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

/**
 * Function to set up the redux store
 * @param {Object} state - Initial state of the app
 * @return {Object} - Store object that can be used in a redux Provider
 */
export default function configureStore(state) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunk, reduxImmutableStateVariant())
  );
}

