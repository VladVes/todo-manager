import React from 'react'; // eslint-disable-line

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
