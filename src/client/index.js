import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.sass';

import React from 'react' // eslint-disable-line
import { render } from 'react-dom' // eslint-disable-line
import thunk from 'redux-thunk'; // eslint-disable-line
import { createStore, applyMiddleware, compose } from 'redux'; // eslint-disable-line
import reducers from './reducers';
import App from './components/App.jsx'; // eslint-disable-line
import { fetchTasks } from './actions';

/* eslint-disable no-underscore-dangle */
// const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line
// const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk),
  // , devtoolMiddleware
  )); // eslint-disable-line
store.dispatch(fetchTasks());

render(
  <App store={store} />,
  document.getElementById('root') // eslint-disable-line
);
