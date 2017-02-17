import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage'; 
import SignUpPage from './components/authentication/SignUpPage';
import SignInPage from './components/authentication/SignInPage';
import CreateDocumentPage from './components/document/CreateDocumentPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="sign_in" component={SignInPage}/>
    <Route path="sign_up" component={SignUpPage}/>
    <Route path="create_document" component={CreateDocumentPage}/>
  </Route>
);