import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types'; // eslint-disable-line
import { Provider } from 'react-redux'; // eslint-disable-line
import { BrowserRouter as Router, Route } from 'react-router-dom'; // eslint-disable-line
import Welcome from './Welcome.jsx'; // eslint-disable-line
import NewTodoForm from '../containers/NewTodoForm';
import TodoList from '../containers/TodoList';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="mx-auto mt-5 col-7">
        <Route exact={true} path="/" component={Welcome} />
        <Route exact={true} path="/tasks" component={TodoList} />
        <Route exact={true} path="/tasks/new" component={NewTodoForm} />
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
