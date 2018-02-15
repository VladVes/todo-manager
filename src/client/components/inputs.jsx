import React from 'react'; // eslint-disable-line;
import FontAwesomeIcon from '@fortawesome/react-fontawesome';// eslint-disable-line
import { faExclamationCircle } from '@fortawesome/fontawesome-free-solid';// eslint-disable-line
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder='...' type={type}/>
      {touched && ((error && <div className="alert alert-danger mt-3">
        <FontAwesomeIcon icon={faExclamationCircle} />
        {error}
      </div>) ||
        (warning && <div className="alert alert-warning mt-3">{warning}</div>))}
    </div>
  </div>
);

export const renderDatePicker = ({ input, label, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <DatePicker className="form-control" {...input} dateForm="DD/MM/YYYY" selected={input.value ? moment(input.value) : null} />
      {touched && ((error && <div className="alert alert-danger mt-3">
        <FontAwesomeIcon icon={faExclamationCircle} />
        {error}
      </div>) ||
        (warning && <div className="alert alert-warning mt-3">{warning}</div>))}
    </div>
  </div>
);
