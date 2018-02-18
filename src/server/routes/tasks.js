import _ from 'lodash';
import { Task, Queue } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    try {
      const tasks = await Task.find();
      let queue = await Queue.findOne({ name: 'order' });
      if (!queue) {
        queue = await Queue.create({ name: 'order', data: [] });
      }
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
        const queue = await Queue.findOne({ name: 'order' });
        queue.set({ data: [...queue.data, savedTask._id] }); // eslint-disable-line
        const savedQueue = await queue.save();
        ctx.body = { task: savedTask, queue: savedQueue.data };
      } catch (e) {
        throw new Error(e);
      }
    })
    .post('taskOrdering', '/tasks/:id/ordering', async (ctx) => {
      const { order } = ctx.request.body;
      try {
        const task = await Task.findOne({ _id: order.taskId });
        const queue = await Queue.findOne({ name: 'order' });
        const prevIndex = order.index;
        const newData = queue.data;
        let newIndex;
        switch (order.move) {
          case 'up': {
            newIndex = order.index - 1;
            break;
          }
          case 'down': {
            newIndex = order.index + 1;
            break;
          }
          default: {
            throw new Error('incorrect order move direction');
          }
        }
        const movedValue = newData[newIndex];
        newData[newIndex] = task._id; // eslint-disable-line
        newData[prevIndex] = movedValue;
        await queue.remove();
        const newQueue = await Queue.create({ name: 'order', data: newData });
        ctx.body = { queue: newQueue.data };
      } catch (e) {
        throw new Error(e);
      }
    })
    .patch('updateTask', '/tasks/:id', async (ctx) => {
      const { id } = ctx.params;
      const data = ctx.request.body;
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          id,
          { $set: { ...data } },
          { new: true },
        );
        ctx.body = { task: updatedTask };
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
        const updatedData = queue.data.filter(item => !_.isEqual(item, task._id)); // eslint-disable-line
        queue.set({ data: updatedData });
        const updatedQueue = await queue.save();
        ctx.body = { queue: updatedQueue.data };
      } catch (e) {
        throw new Error(e);
      }
    });
};
