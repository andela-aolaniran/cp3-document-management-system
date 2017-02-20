import * as ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.newUser, action) {
  switch(action.type) {
  case ActionTypes.CREATE_COURSE: {
    const newState = Object.assign({}, action.newUser);
    return newState;
  }
  default: {
    return state;
  }
  }
}
 