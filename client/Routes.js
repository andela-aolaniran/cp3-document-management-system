import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import SignUpPage from './components/authentication/SignUpPage';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="sign_up" component={SignUpPage}/>
  </Route>
);
