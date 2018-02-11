import React from 'react'; // eslint-disable-line
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import cn from 'classnames'; // eslint-disable-line

class NewToDoForm extends React.Component {
  addTask = (values) => {
    this.props.addTask(values);
    this.props.reset();
  }

  render() {
    const { taskCreatingState } = this.props;
    const submitClasses = cn({
      'btn btn-primary btn-sm': true,
      // BEGIN (write your solution here)
      disabled: taskCreatingState === 'requested',
    });

    return <form action="" className="form-inline" onSubmit={this.props.handleSubmit(this.addTask)}>
      <div className="form-group mx-3">
        <Field name="text" required component="input" type="text" />
      </div>
      <button type="submit" className={submitClasses}>Add</button>
    </form>;
  }
}

export default reduxForm({
  form: 'newTask',
})(NewTaskForm);
