import React from 'react'; // eslint-disable-line
import NewToDoFormContainer from '../containers/NewToDoForm';
import ToDoListContainer from '../containers/ToDoList';

export default () => (
  <div className="col-5">
    <NewToDoFormContainer />
    <ToDoListContainer />
  </div>
);
