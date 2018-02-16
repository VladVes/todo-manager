import _ from 'lodash';
import React from 'react';
import { NavLink } from 'react-router-dom'; // eslint-disable-line
import Modal from 'react-modal'; // eslint-disable-line
import FontAwesomeIcon from '@fortawesome/react-fontawesome';// eslint-disable-line
import { faArrowUp, faArrowDown, faEdit, faTrash, faPlusCircle } from '@fortawesome/fontawesome-free-solid'// eslint-disable-line
import cn from 'classnames'; // eslint-disable-line


const filters = [['all', 'all'], ['new', 'new'], ['active', 'active'], ['resolved', 'resolved'], ['closed', 'closed']];
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class TodoList extends React.Component {
  state = {
    activeFilter: 'all',
    modalIsOpen: false,
    taskId: null,
  };

  getConfirmation = id => (e) => {
    e.preventDefault();
    this.setState({ modalIsOpen: true, taskId: id });
  }

  removeTask = () => {
    this.props.removeTask({ id: this.state.taskId });
    this.setState({ modalIsOpen: false, taskId: null });
  }

  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  editTask = id => (e) => {
    e.preventDefault();
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
      'btn btn-secondary': true,
      disabled: this.props.taskOrderingState === 'requested',
    });
    const rawTasks = this.props.tasks;
    const { queue } = this.props;
    const orderedTasks = queue.reduce((acc, id, index) => {
      const task = _.find(rawTasks, t => _.isEqual(t._id, id)); // eslint-disable-line
      if (!task) {
        return acc;
      }
      task.order = index + 1;
      return [...acc, task];
    }, []);

    const filter = this.state.activeFilter;
    const tasks = filter === 'all' ? orderedTasks : orderedTasks.filter(t => t.status === filter);

    return (
      <div>
        <div class="table-responsive-sm">
          <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Header</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ _id, order, header, priority, status, deadLine }) => ( // eslint-disable-line
              <tr>
                <th>
                  <div class="btn-group btn-group-sm" role="group" aria-label="First group">
                    <button type="button" className={buttonClasses} onClick={this.taskOrderUp(_id, order)}>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button type="button" className={buttonClasses} onClick={this.taskOrderDown(_id, order)}>
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
                </th>
                <th>{order}</th>
                <th>{(status === 'closed' ? <s>{header}</s> : header)}</th>
                <th>{priority}</th>
                <th>{status}</th>
                <th>{deadLine}</th>
                <th>
                  <div class="btn-group btn-group-sm" role="group" aria-label="First group">
                    <button type="button" className={buttonClasses} onClick={this.editTask(_id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button type="button" className={buttonClasses} onClick={this.getConfirmation(_id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </th>
              </tr>))}
          </tbody>
        </table>
      </div>
      <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         contentLabel="Task delete confirmation"
       >
         <h2 ref={subtitle => this.subtitle = subtitle}>Are you sure ?</h2>
         <button className="btn btn-secondary mx-3" onClick={this.closeModal}>Close</button>
         <button className="btn btn-danger mx-3" onClick={this.removeTask}>Delete</button>
       </Modal>
    </div>
    );
  }

  renderFilter([state, name]) {
    return this.state.activeFilter === state ?
      name : <a key={state} className={`app-filter-${state}`} href="#" onClick={() => this.applyFilter(state)}>{name}</a>;
  }

  render() {
    //  const { tasks } = this.props;

    if (this.props.tasksFetchingState === 'failed') {
      return (
        <div>
          <h1>ToDo list:</h1>
          <div className="alert alert-danger" role="alert">
            Something went wrong! Can't fetch tasks
          </div>
        </div>
      );
    }
    if (this.props.tasksFetchingState === 'requested') {
      return <div><h1>ToDo list:</h1><h3>Loading...</h3></div>;
    }

    return <div className="mt-3 mx-auto">
      <h1>ToDo list:</h1>
      <NavLink to="tasks/new">
        <button className="btn btn-success btn-lg">
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </NavLink>
        <div className="col-5 mt-3 d-flex justify-content-around">
          {filters.map(filter => this.renderFilter(filter))}
        </div>
      {this.renderTasks()}
    </div>;
  }
}
