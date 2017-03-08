
import * as ActionTypes from './ActionTypes';

/**
 * Function to fire when we want to update the sign up process status
 * @param {Object} newStatus - new Status of signUp
 * @return {Object} - Object containing the action type and
 * new user data
 */
export function updateSignUpProcessing(newStatus) {
  return {
    type: ActionTypes.PROCESSING_SIGN_UP,
    status: newStatus
  };
}

/**
 * Function to fire when we want to update the sign in process status
 * @param {Object} newStatus - new Status of sign in process
 * @return {Object} - Object containing the action type and
 * new user data
 */
export function updateSignInProcessing(newStatus) {
  return {
    type: ActionTypes.PROCESSING_SIGN_IN,
    status: newStatus
  };
}
