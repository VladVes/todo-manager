import { connect } from 'react-redux'; // eslint-disable-line
import Component from '../components/TodoList.jsx';
import * as actionCreators from '../actions';
import { tasksSelector, queueSelector } from '../selectors';

const Container = connect(
  (state) => {
    const props = {
      tasks: tasksSelector(state),
      queue: queueSelector(state),
      taskOrderingState: state.taskOrderingState,
    };
    return props;
  },
  actionCreators,
)(Component);

export default Container;
