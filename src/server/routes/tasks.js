import path from 'path';
import { Task } from '../models';

export default (router) => {
  router.get('tasks', '/tasks', async (ctx) => {
    try {
      const tasks = await Task.find();
      console.log("All tasks: ", tasks);

      ctx.body = tasks;
    } catch (e) {
      console.log("Errors: ", e);
    }

  });
};

 //res.json(data)

//res.status(200);
//res.send('Hello World!');

/*
response.setHeader(
'Content-Type', 'application/json'
  );
  response.write(JSON.stringify(result));
response.end();

*/
