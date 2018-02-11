import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react' // eslint-disable-line
import { render } from 'react-dom' // eslint-disable-line
import { Provider } from 'react-redux' // eslint-disable-line
import thunk from 'redux-thunk'; // eslint-disable-line
import { createStore, applyMiddleware, compose } from 'redux'; // eslint-disable-line
import reducers from './reducers';
import App from './components/App.jsx';
import { fetchTasks } from './actions';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

store.dispatch(fetchTasks());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
