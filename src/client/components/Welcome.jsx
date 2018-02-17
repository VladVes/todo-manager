import React from 'react'; // eslint-disable-line
import { NavLink } from 'react-router-dom'; // eslint-disable-line

const Welcome = () =>
  <div>
    <h1>Welcome to the ToDo manager</h1>
    <p>Drive your tasks and get things done.</p>
      <NavLink to='tasks'>
        <button className="btn btn-primary btn-lg">PROCEED</button>
      </NavLink>
  </div>;

export default Welcome;
