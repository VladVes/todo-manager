import { createSelector } from 'reselect'; // eslint-disable-line

export const getTasks = state => state.tasks;
export const getQueue = state => state.queue;

export const tasksSelector = createSelector(
  getTasks,
  tasks => Object.values(tasks),
);

export const queueSelector = createSelector(
  getQueue,
  queue => queue,
);
