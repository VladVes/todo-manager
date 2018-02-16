import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react' // eslint-disable-line
import { render } from 'react-dom' // eslint-disable-line
import { Provider } from 'react-redux' // eslint-disable-line
import thunk from 'redux-thunk'; // eslint-disable-line
import { createStore, applyMiddleware, compose } from 'redux'; // eslint-disable-line
import { Router, Route } from 'react-router'
import { syncHistoryWithStore, browserHistory } from 'react-router-redux'
import reducers from './reducers';
import App from './components/App.jsx'; // eslint-disable-line
import { fetchTasks } from './actions';

import NewTodoFormContainer from './containers/NewTodoForm'; // eslint-disable-line
import TodoListContainer from './containers/TodoList'; // eslint-disable-line

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
console.log('BROWSER HISTORY', browserHistory);

const history = syncHistoryWithStore(browserHistory, store);


render(
  <Provider store={store}>
    <Router history={history}>
       <Route path="/" component={App}>
         <Route path="tasks" component={TodoListContainer}/>
         <Route path="newtask" component={NewTodoFormContainer}/>
       </Route>
     </Router>
  </Provider>,
  document.getElementById('root'),
);
