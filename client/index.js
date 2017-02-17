import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './Routes';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
$(document).ready(() => {
  $('select').material_select();
});
render(
  <Router history={browserHistory} routes={Routes} />,
  document.getElementById('app')
);