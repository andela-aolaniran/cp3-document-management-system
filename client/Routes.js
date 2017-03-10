import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import SignUpForm from './components/authentication/SignUpForm';
import SignInForm from './components/authentication/SignInForm';
import HomePage from './components/home/HomePage';
import authRoutesHandler from './components/authentication/authRoutesHandler';
import unAuthRoutesHandler from
  './components/authentication/unAuthRoutesHandler';
import DocumentsList from './components/document/DocumentsList';
import Document from './components/document/Document';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={unAuthRoutesHandler(SignUpForm)} />
    <Route path="signin" component={unAuthRoutesHandler(SignInForm)} />
    <Route path="documents" component={authRoutesHandler(DocumentsList)} />
    <Route path="documents/:id" component={authRoutesHandler(Document)} />
  </Route>
);
