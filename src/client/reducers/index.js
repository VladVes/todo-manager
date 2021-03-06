import { omit, mapKeys } from 'lodash'; // eslint-disable-line
import { combineReducers } from 'redux'; // eslint-disable-line
import { handleActions } from 'redux-actions'; // eslint-disable-line
import { reducer as formReducer } from 'redux-form'; // eslint-disable-line
import { routerReducer } from 'react-router-redux'; // eslint-disable-line
import * as actions from '../actions'; // eslint-disable-line

const taskCreatingState = handleActions({
  [actions.addTaskRequest]() {
    return 'requested';
  },
  [actions.addTaskFailure]() {
    return 'failed';
  },
  [actions.addTaskSuccess]() {
    return 'successed';
  },
}, 'none');

const taskRemovingState = handleActions({
  [actions.removeTaskRequest]() {
    return 'requested';
  },
  [actions.removeTaskFailure]() {
    return 'failed';
  },
  [actions.removeTaskSuccess]() {
    return 'successed';
  },
}, 'none');

const tasksFetchingState = handleActions({
  [actions.fetchTasksRequest]() {
    return 'requested';
  },
  [actions.fetchTasksFailure]() {
    return 'failed';
  },
  [actions.fetchTasksSuccess]() {
    return 'successed';
  },
}, 'none');

const taskOrderingState = handleActions({
  [actions.taskOrderingRequest]() {
    return 'requested';
  },
  [actions.taskOrderingFailure]() {
    return 'failed';
  },
  [actions.taskOrderingSuccess]() {
    return 'successed';
  },
}, 'none');

const taskUpdatingState = handleActions({
  [actions.updatTaskRequest]() {
    return 'requested';
  },
  [actions.updatTaskFailure]() {
    return 'failed';
  },
  [actions.updatTaskSuccess]() {
    return 'successed';
  },
}, 'none');

const tasks = handleActions({
  [actions.fetchTasksSuccess](state, { payload }) {
    return mapKeys(payload.data.tasks, '_id');
  },
  [actions.addTaskSuccess](state, { payload: { data } }) {
    return { ...state, [data.task._id]: data.task }; // eslint-disable-line
  },
  [actions.removeTaskSuccess](state, { payload: { task } }) {
    return omit(state, task.id);
  },
  [actions.updateTaskSuccess](state, { payload: { data } }) {
    return { ...state, [data.task._id]: data.task }; // eslint-disable-line
  },
  [actions.toggleTaskState](state, { payload: { id } }) {
    const task = state[id];
    const newState = task.state === 'active' ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return { ...state, [task.id]: updatedTask };
  },
}, {});

const queue = handleActions({
  [actions.fetchTasksSuccess](state, { payload }) {
    return payload.data.queue;
  },
  [actions.addTaskSuccess](state, { payload: { data } }) {
    return data.queue;
  },
  [actions.taskOrderingSuccess](state, { payload: { data } }) {
    return data.queue;
  },
  [actions.removeTaskSuccess](state, { payload: { data } }) {
    return data.queue;
  },
}, []);

export default combineReducers({
  taskCreatingState,
  taskRemovingState,
  tasksFetchingState,
  taskOrderingState,
  taskUpdatingState,
  tasks,
  queue,
  form: formReducer,
  routing: routerReducer,
});
