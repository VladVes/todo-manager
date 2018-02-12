import React from 'react';

const filters = [['All', 'All'], ['New', 'New'], ['Active', 'Active'], ['Resolved', 'Resolved'], ['Closed', 'Closed']];

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

  renderTasks() {
    const rawTasks = this.props.tasks;
    const filter = this.state.activeFilter;
    const tasks = filter === 'All' ? rawTasks : rawTasks.filter(t => t.status === filter);

    return (
      <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Header</th>
          <th scope="col">Priority</th>
          <th scope="col">Status</th>
          <th scope="col">Deadline</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(({ _id, header, priority, status, deadLine }) => (
          <tr>
            <th>{(status === 'Closed' ? <s>{header}</s> : header)}</th>
            <th>{priority}</th>
            <th>{status}</th>
            <th>{deadLine}</th>
            <a href="#" className="app-remove-task" onClick={this.removeTask(_id)}>x</a>
          </tr>))}
      </tbody>
    </table>
    );

    /*
      <ul className="list-group">
      {tasks.map(({ _id, header, priority, state, deadLine }) => (
        <li key={_id} className="list-group-item d-flex justify-content-end">
          <a href="#" className="app-toggle-state mr-3" onClick={this.toggleTaskState(_id)}>-</a>
          <div className="mr-auto">{(state === 'Closed' ? <s>{header}</s> : header)}</div>
          <div className="mr-auto">Priority: {priority}</div>
          <div className="mr-auto">State: {state}</div>
          <a href="#" className="app-remove-task" onClick={this.removeTask(_id)}>x</a>
        </li>))}
    </ul>;
    */
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
