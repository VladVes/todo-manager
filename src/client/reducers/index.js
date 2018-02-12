import { omit, mapKeys } from 'lodash'; // eslint-disable-line
import { combineReducers } from 'redux'; // eslint-disable-line
import { handleActions } from 'redux-actions'; // eslint-disable-line
import { reducer as formReducer } from 'redux-form'; // eslint-disable-line
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

const tasks = handleActions({
  [actions.fetchTasksSuccess](state, { payload }) {
    return mapKeys(payload.tasks, '_id');
  },
  [actions.addTaskSuccess](state, { payload: { task } }) {
    console.log('Added TASK: ', task);
    const newState = { ...state, [task._id]: task };
    console.log('state: ', newState);
    return newState;
  },
  [actions.removeTaskSuccess](state, { payload: { task } }) {
    return omit(state, task.id);
  },
  [actions.updateTaskSuccess](state, { payload: { task } }) {
    const oldTask = state[task.id];
    const updatedTask = { ...oldTask, ...task };
    return { ...state, [task.id]: updatedTask };
  },
  [actions.toggleTaskState](state, { payload: { id } }) {
    const task = state[id];
    const newState = task.state === 'active' ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return { ...state, [task.id]: updatedTask };
  },
}, {});

export default combineReducers({
  taskCreatingState,
  taskRemovingState,
  tasksFetchingState,
  tasks,
  form: formReducer,
});
