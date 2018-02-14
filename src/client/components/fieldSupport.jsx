import React from 'react'; // eslint-disable-line
import FontAwesomeIcon from '@fortawesome/react-fontawesome';// eslint-disable-line
import * as icons from '@fortawesome/fontawesome-free-solid'// eslint-disable-line

export const required = value => (value ? undefined : 'Required');
const maxLength = max => value => (
  value && value.length > max ? `Must be ${max} characters or less` : undefined
);
export const maxLength50 = maxLength(50);

export const normalizeDate = (value) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 2 && /^[0-3]$/.test(onlyNums)) {
    return onlyNums;
  }
  /*
  if (onlyNums[0] === 1 && /^[0-3]?$/.test(onlyNums)) {
    return onlyNums;
  }
  if (onlyNums.length <= 4 && /^[0-3][0-9][0-1][0-9]?$/.test(onlyNums)) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
  */
};

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder='...' type={type}/>
      {touched && ((error && <div className="alert alert-danger mt-3">
        <FontAwesomeIcon icon={icons.faExclamationCircle} />
        {error}
      </div>) ||
        (warning && <div className="alert alert-warning mt-3">{warning}</div>))}
    </div>
  </div>
);
