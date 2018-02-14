const host = '';

export default {
  tasksUrl: () => [host, 'tasks'].join('/'),
  taskUrl: id => [host, 'tasks', id].join('/'),
  changeTaskOrderUrl: id => [host, 'tasks', id, 'ordering'].join('/'),
};
