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
    .post('taskOrdering', '/tasks/:id/ordering', async (ctx) => {
      const { order } = ctx.request.body;
      console.log('ORDER DATA RECIVED: ', order);
      try {
        const task = await Task.findOne({ _id: order.taskId });
        console.log('TASK FiNDED: ', task);
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
        console.log("DATA TO MOVE: ", movedValue);
        newData[newIndex] = task._id;
        newData[prevIndex] = movedValue;
        console.log("DATA TO SAVE: ", newData);
        await queue.remove();
        const newQueue = await Queue.create({ name: 'order', data: newData });
        console.log("DATA AFTER SAVE: ", newQueue.data);
        ctx.body = { queue: newQueue.data };
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
        const updatedQueue = await queue.save();
        ctx.body = { queue: updatedQueue.data };
      } catch (e) {
        throw new Error(e);
      }
    });
};
