import httpRequester from 'superagent';
import * as ActionTypes from './ActionTypes';
import * as authActions from './authActions';

/**
 * Fucntion to fire create user action
 * @param {Object} newUser - new User to be created
 * @return {Object} - Object containing the action type and
 * new user data
 */
export function setUser(newUser) {
  return {
    type: ActionTypes.SET_USER,
    newUser
  };
}

/**
 * Function to fire login user action
 * @param {Object} userCredentials - Object containing user credentials to be
 * used for the log in
 * @return {Object} - Object containing the action type and
 * the user credential data
 */
export function login(userCredentials) {
  console.log('user credentials: ', userCredentials)
  return (dispatch) => {
    httpRequester
    .post('/api/users/login')
    .send(userCredentials)
    .end((error, response) => {
      dispatch(authActions.updateSignInProcessing(false));
      if (response.status === 200) {
        localStorage.setItem('dms_user', JSON.stringify(response.body));
        dispatch(setUser(response.body));
      } else {
        // dispatch(setUser(response.body));
      }
    });
  };
}

export function signUp(userData) {
  return (dispatch) => {
    httpRequester
    .post('/api/users')
    .send(userData)
    .end((error, response) => {
      dispatch(authActions.updateSignUpProcessing(false));
      if (response.status === 201) {
        localStorage.setItem('dms_user', JSON.stringify(response.body));
        dispatch(setUser(response.body));
      } else {
        // we should dispatch our signUp errors update here
        console.log(response.body);
      }
    });
  };
}

export function signOut(userToken) {
  return (dispatch) => {
    httpRequester
    .post('/api/users/logout')
    .set({ 'x-access-token': userToken })
    .end((error, response) => {
      console.log('signout response gotten', response.body);
      if (response.status === 200) {
        localStorage.removeItem('dms_user');
        const emptyUser = {
          email: '',
          firstName: '',
          lastName: '',
          roleId: -1,
          id: -1,
          createdAt: '',
          token: ''
        };
        dispatch(setUser(emptyUser));
      } else {
        // we should dispatch our signOut errors update here
        console.log(response.body);
      }
    });
  }
}
