import React from 'react'; // eslint-disable-line
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import cn from 'classnames'; // eslint-disable-line
import { required, maxLength50, laterThenToday } from './validators';
import { renderField, renderDatePicker } from './inputs.jsx';

class EditTodoForm extends React.Component {
  updateTask = (value) => {
    const task = { _id: this.props.taskId, ...value }; // eslint-disable-line
    console.log('UPDATED TASK TO SAVE: ', task);
    this.props.closeTaskEditModal();
    this.props.updateTask(task);
  }

  render() {
    const { taskUpdatingState } = this.props;
    const submitClasses = cn({
      'btn btn-primary btn-sm': true,
      disabled: taskUpdatingState === 'requested',
    });

    return (
      <div className="mx-auto">
        <form action="" className="" onSubmit={this.props.handleSubmit(this.updateTask)}>
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
            <button type="submit" className={submitClasses}>Save changes</button>
            <button className="btn btn-secondary btn-sm" onClick={this.props.closeTaskEditModal}>Close</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editTask',
})(EditTodoForm);
