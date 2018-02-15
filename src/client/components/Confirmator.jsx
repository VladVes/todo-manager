import React from 'react';
import Confirm from 'react-confirm-bootstrap'; //eslint-disable-line

export default class Confirmator extends React.Component {
   onConfirm = (e) => {
     e.preventDefault();
     console.log('FROM CONFRIM DELETE HANDLER!!!!');
     this.props.removeTask({ id: this.props.data, confirmator: '!!!!!!!!!!WTF!!!!!!!!!!' });
   }

   render() {
     return (
       <Confirm
         onConfirm={this.onConfirm}
         body="Are you sure you want to delete this task?"
         confirmText="Confirm Delete"
         title="Deleting task">
         <button>DELETE</button>
       </Confirm>
     );
   }
}
