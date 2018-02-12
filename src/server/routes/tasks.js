import { Task } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    try {
      const tasks = await Task.find();
      ctx.body = tasks;
    } catch (e) {
      throw new Error(e);
    }
  })
    .post('addNewTask', '/tasks', async (ctx) => {
      const { task } = ctx.request.body;
      const newTask = new Task(task);
      try {
        const savedTask = await newTask.save();
        ctx.body = savedTask;
      } catch (e) {
        throw new Error(e);
      }
    })
    .delete('deleteTask', '/tasks/:id', async (ctx) => {
      const { id } = ctx.params;
      try {
        const task = await Task.findById(id);
        await task.remove();
        ctx.response.status = 200;
      } catch (e) {
        throw new Error(e);
      }
    });
};
