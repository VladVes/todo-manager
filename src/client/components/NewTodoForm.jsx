import React from 'react'; // eslint-disable-line
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import cn from 'classnames'; // eslint-disable-line

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
        <label htmlFor="header">To do:</label>
        <Field name="header" required component="input" type="text" className="form-control" id="header" />
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
        <label htmlFor="deadLine">Dead line:</label>
        <Field name="deadLine" className="form-control" required component="input" type="text" id="deadLine" />
        <small id="headerHelp" className="form-text text-muted">Select date</small>
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
