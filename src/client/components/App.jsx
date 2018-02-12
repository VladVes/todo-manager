import React from 'react'; // eslint-disable-line
import NewTodoFormContainer from '../containers/NewTodoForm';
import TodoListContainer from '../containers/TodoList';

export default () => (
  <div className="mx-auto mt-5 col-8">
    <NewTodoFormContainer />
    <TodoListContainer />
  </div>
);
