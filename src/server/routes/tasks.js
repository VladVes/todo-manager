import { Task, Queue } from '../models';

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
      console.log("recived task: ", task);
      const newTask = new Task(task);
      try {
        const count = await Task.count();
        const savedTask = await newTask.save();
        await Queue.create({ taskId: savedTask._id, order: count + 1 });
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
