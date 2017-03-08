import * as ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

/**
 * Reducer to handle user slice of our state tree
 * @param {Object} state previous state object
 * @param {Object} action - Object containing the action type with other
 * payload that may be required.
 * @return {Object} Un-mutated object Object representing the slice of
 * our state tree this Reducer handles
 */
export default function user(state = initialState.user, action) {
  switch (action.type) {
  case ActionTypes.SET_USER: {
    const newState = Object.assign({}, state, action.newUser);
    return newState;
  }
  default: {
    return state;
  }
  }
}
