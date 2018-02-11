import { User, Task } from '../models';

export default (router) => {
  router.get('datatest', '/datatest', async (ctx) => {
    const newTask = new Task({
      header: 'The first super task',
      priority: 'low',
      status: 'new',
      deadLine: 'tommorrow',
    });

    try {
      const task = await newTask.save();
      ctx.render('start/dataTest', { task });
    } catch (e) {
      console.log(e);
    }

  });
};
