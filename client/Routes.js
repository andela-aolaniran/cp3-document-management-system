import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import SignUpForm from './components/authentication/SignUpForm';
import SignInForm from './components/authentication/SignInForm';
import HomePage from './components/home/HomePage';
import authRoutesHandler from './components/authentication/authRoutesHandler';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={authRoutesHandler(HomePage)} />
    <Route path="signup" component={SignUpForm} />
    <Route path="signin" component={SignInForm} />
  </Route>
);
