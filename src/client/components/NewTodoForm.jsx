import React from 'react'; // eslint-disable-line
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import { NavLink } from 'react-router-dom'; // eslint-disable-line
import Modal from 'react-modal'; // eslint-disable-line
import cn from 'classnames'; // eslint-disable-line
import { required, maxLength50, laterThenToday } from './validators';
import { renderField, renderDatePicker } from './inputs.jsx';

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

class NewTodoForm extends React.Component {
  state = {
    modalIsOpen: false,
  };

  addTask = (values) => {
    this.props.addTask(values);
    this.props.reset();
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { taskCreatingState } = this.props;
    const submitClasses = cn({
      'btn btn-primary': true,
      disabled: taskCreatingState === 'requested',
    });

    return (
      <div className="mx-auto my-auto">
        <h1>Create new task</h1>
        <form action="" className="" onSubmit={this.props.handleSubmit(this.addTask)}>
          <div className="form-group mx-3">
            <Field name="header" type="text" id="header"
              component={renderField} label="To do: "
              validate={[maxLength50, required]}
            />
            <small id="headerHelp" className="form-text text-muted">To do can contain up to 50 characters</small>
          </div>
          <div className="form-group mx-3">
            <label htmlFor="priority">Priority:</label>
            <Field name="priority" className="form-control" required component="select" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="hight">Higth</option>
            </Field>
          </div>
          <div className="form-group mx-3">
            <label htmlFor="status">Status:</label>
            <Field name="status" className="form-control" required component="select" id="status">
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </Field>
          </div>
          <div className="form-group mx-3">
            <Field name="deadLine" component={renderDatePicker} label="Deadline: " validate={[required, laterThenToday]} />
          <small id="headerHelp" className="form-text text-muted">Date format: MM.DD.YYYY</small>
          </div>
          <div className="form-group mx-3">
            <button type="submit" className={submitClasses}>Add</button>
            <NavLink to='/tasks'>
              <button className="btn btn-secondary">Close</button>
            </NavLink>
          </div>
        </form>
        <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           style={customStyles}
           contentLabel="Task creating"
         >
           <h2 ref={subtitle => this.subtitle = subtitle}>Creating task...</h2>
           <h3>{this.props.taskCreatingState === 'successed' ? 'Task created!' : 'Something goes wrong, try enother one'}</h3>
           <button className="btn btn-success mx-3" onClick={this.closeModal}>Create another task</button>
           <NavLink to='/tasks'>
             <button className="btn btn-primary mx-3" onClick={this.closeModal}>To list</button>
           </NavLink>
         </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newTask',
})(NewTodoForm);
