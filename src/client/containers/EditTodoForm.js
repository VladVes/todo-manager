import { connect } from 'react-redux'; // eslint-disable-line
import Component from '../components/EditTodoForm.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = ({ taskUpdatingState }) => {
  const props = {
    taskUpdatingState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
