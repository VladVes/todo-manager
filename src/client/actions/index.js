import axios from 'axios'; // eslint-disable-line
import _ from 'lodash'; // eslint-disable-line
import { createAction } from 'redux-actions'; // eslint-disable-line

import routes from '../routes';

export const toggleTaskState = createAction('TASK_STATE_TOGGLE');

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

export const addTaskRequest = createAction('TASK_ADD_REQUEST');
export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');
export const addTaskFailure = createAction('TASK_ADD_FAILURE');

export const updateTaskRequest = createAction('TASK_UPDATE_REQUEST');
export const updateTaskSuccess = createAction('TASK_UPDATE_SUCCESS');
export const updateTaskFailure = createAction('TASK_UPDATE_FAILURE');

export const taskOrderingRequest = createAction('TASK_ORDER_REQUEST');
export const taskOrderingSuccess = createAction('TASK_ORDER_SUCCESS');
export const taskOrderingFailure = createAction('TASK_ORDER_FAILURE');

export const addTask = task => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const response = await axios.post(routes.tasksUrl(), { task });
    dispatch(addTaskSuccess({ data: response.data }));
  } catch (e) {
    dispatch(addTaskFailure());
  }
};

export const updateTask = task => async (dispatch) => {
  dispatch(updateTaskRequest());
  const {
    header,
    priority,
    status,
    deadLine,
  } = task;
  try {
    const response = await axios.patch(routes.taskUrl(task._id), {  // eslint-disable-line
      header,
      priority,
      status,
      deadLine,
    });
    dispatch(updateTaskSuccess({ data: response.data }));
  } catch (e) {
    dispatch(updateTaskFailure());
  }
};

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(fetchTasksSuccess({ data: response.data }));
  } catch (e) {
    dispatch(fetchTasksFailure());
  }
};

export const removeTask = task => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    const url = routes.taskUrl(task.id);
    const responde = await axios.delete(url);
    dispatch(removeTaskSuccess({ task, data: responde.data }));
  } catch (e) {
    dispatch(removeTaskFailure({ task }));
  }
};

export const changeTaskOrder = order => async (dispatch) => {
  dispatch(taskOrderingRequest());
  try {
    const url = routes.changeTaskOrderUrl(order.taskId);
    const response = await axios.post(url, { order });
    dispatch(taskOrderingSuccess({ data: response.data }));
  } catch (e) {
    dispatch(taskOrderingFailure(e));
  }
};
