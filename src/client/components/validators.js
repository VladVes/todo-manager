import React from 'react'; // eslint-disable-line

export const required = value => (value ? undefined : 'Required');
const maxLength = max => value => (
  value && value.length > max ? `Must be ${max} characters or less` : undefined
);
export const maxLength50 = maxLength(50);

export const laterThenToday = (value) => {
  const now = new Date();
  const recived = new Date(value);
  return now.getTime() >= recived.getTime() ? 'Deadline should be later than today' : undefined;
};
