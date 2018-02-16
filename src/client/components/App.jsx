import React from 'react'; // eslint-disable-line
import { Link } from 'react-router'; // eslint-disable-line

export default (props) => (
  <div className="mx-auto mt-5 col-8">
    <header>ToDo manager</header>
      <menu>
        <ul>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/newtask">New task</Link></li>
        </ul>
      </menu>
      {props.children}
  </div>
);
