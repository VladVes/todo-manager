import { connect } from 'react-redux'; // eslint-disable-line
import Component from '../components/Confirmator.jsx';
import * as actionCreators from '../actions';

const Container = connect(
  (state) => {
    const props = {
      data: state.confirmationState.data,
      confirmation: state.confirmationState.confirm,
    };
    return props;
  },
  actionCreators,
)(Component);

export default Container;
