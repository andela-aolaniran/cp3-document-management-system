import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './Routes';
import configureStore from './store/configureStore';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
// $(document).ready(() => {
//   $('select').material_select();
// });
// instantiate your store
const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>,
  document.getElementById('app')
);
