import React from 'react'; // eslint-disable-line
import NewTodoFormContainer from '../containers/NewTodoForm'; // eslint-disable-line
import TodoListContainer from '../containers/TodoList'; // eslint-disable-line

export default () => (
  <div className="mx-auto mt-5 col-8">
    <NewTodoFormContainer />
    <TodoListContainer />
  </div>
);
