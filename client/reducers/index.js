import { combineReducers } from 'redux';
import initialState from './initialState';
import * as ActionTypes from '../actions/ActionTypes';
import user from './user';

function processingSignUp(state = initialState.processingSignUp, action) {
  switch (action.type) {
  case ActionTypes.PROCESSING_SIGN_UP: {
    return action.status;
  }
  default: {
    return state;
  }
  }
}

function processingSignIn(state = initialState.processingSignIn, action) {
  switch (action.type) {
  case ActionTypes.PROCESSING_SIGN_IN: {
    return action.status;
  }
  default: {
    return state;
  }
  }
}

const rootReducer = combineReducers({
  user,
  processingSignUp,
  processingSignIn
});

export default rootReducer;
