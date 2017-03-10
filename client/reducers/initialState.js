const persistedUser = JSON.parse(localStorage.getItem('dms_user'));
export default {
  user: {
    token: persistedUser ? persistedUser.token : '',
    id: persistedUser ? persistedUser.userId : -1,
    firstName: persistedUser ? persistedUser.firstName : '',
    lastName: persistedUser ? persistedUser.lastName : '',
    email: persistedUser ? persistedUser.email : '',
    roleId: persistedUser ? persistedUser.roleId : -1
  },
  documents: [],
  roles: [],
  signInErrors: [],
  signUpErrors: [],
  processingSignUp: false,
  processingSignIn: false,
  fetchingDocuments: false,
  loadingDocument: false
};
