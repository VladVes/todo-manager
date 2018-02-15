import React from 'react'; // eslint-disable-line
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import cn from 'classnames'; // eslint-disable-line
import { required, maxLength50, laterThenToday } from './validators';
import { renderField, renderDatePicker } from './inputs.jsx';

class NewTodoForm extends React.Component {
  addTask = (values) => {
    this.props.addTask(values);
    this.props.reset();
  }

  render() {
    const { taskCreatingState } = this.props;
    const submitClasses = cn({
      'btn btn-primary btn-sm': true,
      disabled: taskCreatingState === 'requested',
    });

    return <form action="" className="" onSubmit={this.props.handleSubmit(this.addTask)}>
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
      </div>
    </form>;
  }
}

export default reduxForm({
  form: 'newTask',
})(NewTodoForm);
