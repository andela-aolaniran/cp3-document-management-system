import * as ActionTypes from './ActionTypes';

export function createUser(newUser) {
  console.log('user action Called:', newUser);
  return {
    type: ActionTypes.CREATE_COURSE,
    newUser
  }; 
}
