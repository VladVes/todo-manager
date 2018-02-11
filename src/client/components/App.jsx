import React from 'react'; // eslint-disable-line
import NewTodoFormContainer from '../containers/NewTodoForm';
import TodoListContainer from '../containers/TodoList';

export default () => (
  <div className="col-5">
    <NewTodoFormContainer />
    <TodoListContainer />
  </div>
);
