import _ from 'lodash';
import React from 'react';
import fontawesome;
import cn from 'classnames'; // eslint-disable-line

const filters = [['all', 'all'], ['new', 'new'], ['active', 'active'], ['resolved', 'resolved'], ['closed', 'closed']];

export default class TodoList extends React.Component {
  state = { activeFilter: 'All' };

  removeTask = id => (e) => {
    e.preventDefault();
    this.props.removeTask({ id });
  }

  toggleTaskState = id => (e) => {
    e.preventDefault();
    this.props.toggleTaskState({ id });
  }

  applyFilter(state) {
    this.setState({ activeFilter: state });
  }

  taskOrderUp = (taskId, pos) => (e) => {
    e.preventDefault();
    if (pos > 1) {
      this.props.changeTaskOrder({ taskId, index: pos - 1, move: 'up' });
    }
  }

  taskOrderDown = (taskId, pos) => (e) => {
    e.preventDefault();
    if (pos < this.props.queue.length) {
      this.props.changeTaskOrder({ taskId, index: pos - 1, move: 'down' });
    }
  }

  renderTasks() {
    const buttonClasses = cn({
      'btn btn-secondary fas fa-angle-up': true,
      disabled: this.props.taskOrderingState === 'requested',
    });
    const rawTasks = this.props.tasks;
    const queue = this.props.queue;
    const orderedTasks = queue.reduce((acc, id, index) => {
      const task = _.find(rawTasks, t => _.isEqual(t._id, id));
      if (!task) {
        return acc;
      }
      task.order = index + 1;
      return [...acc, task];
    }, []);
    const filter = this.state.activeFilter;
    const tasks = filter === 'All' ? orderedTasks : orderedTasks.filter(t => t.status === filter);

    return (
      <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">#</th>
          <th scope="col">Header</th>
          <th scope="col">Priority</th>
          <th scope="col">Status</th>
          <th scope="col">Deadline</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(({ _id, order, header, priority, status, deadLine }) => (
          <tr>
            <th>
              <div className="btn-group-sm" role="group" aria-label="Basic example">
                <button type="button" className={buttonClasses} onClick={this.taskOrderUp(_id, order)}>Up</button>
                <button type="button" className={buttonClasses} onClick={this.taskOrderDown(_id, order)}>Down</button>
              </div>
            </th>
            <th>{order}</th>
            <th>{(status === 'closed' ? <s>{header}</s> : header)}</th>
            <th>{priority}</th>
            <th>{status}</th>
            <th>{deadLine}</th>
            <a href="#" className="app-remove-task" onClick={this.removeTask(_id)}>x</a>
          </tr>))}
      </tbody>
    </table>
    );
  }

  renderFilter([state, name]) {
    return this.state.activeFilter === state ?
      name : <a key={state} className={`app-filter-${state}`} href="#" onClick={() => this.applyFilter(state)}>{name}</a>;
  }

  render() {
    const { tasks } = this.props;

    //if (tasks.length === 0) {
    //  return null;
    //}

    return <div className="mt-3">
      <h1>ToDo list:</h1>
        <div className="col-5 mt-3 d-flex justify-content-around">
          {filters.map(filter => this.renderFilter(filter))}
        </div>
      {this.renderTasks()}
    </div>;
  }
}
