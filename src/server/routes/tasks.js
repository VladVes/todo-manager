import _ from 'lodash';
import { Task, Queue } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    try {
      const tasks = await Task.find();
      const queue = await Queue.findOne({ name: 'order' });
      ctx.body = { tasks, queue: queue.data };
    } catch (e) {
      throw new Error(e);
    }
  })
    .post('addNewTask', '/tasks', async (ctx) => {
      const { task } = ctx.request.body;
      const newTask = new Task(task);
      try {
        const savedTask = await newTask.save();
        let queue = await Queue.findOne({ name: 'order' });
        if (!queue) {
          queue = await Queue.create({ name: 'order', data: [] });
        }
        queue.set({ data: [...queue.data, savedTask._id] });
        const savedQueue = await queue.save();
        ctx.body = { task: savedTask, queue: savedQueue.data };
      } catch (e) {
        throw new Error(e);
      }
    })
    .delete('deleteTask', '/tasks/:id', async (ctx) => {
      const { id } = ctx.params;
      try {
        const task = await Task.findById(id);
        await task.remove();
        const queue = await Queue.findOne({ name: 'order' });
        const updatedData = queue.data.filter(item => !_.isEqual(item, task._id));
        queue.set({ data: updatedData });
        await queue.save();
        ctx.response.status = 200;
      } catch (e) {
        throw new Error(e);
      }
    });
};
