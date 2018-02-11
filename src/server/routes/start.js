import path from 'path';
import { mongodb } from '../models';

const indexPath = path.join(__dirname, '../../../public/index.html');
export default (router) => {
  router.get('root', '/', (ctx) => {
    /*
    ctx.render('start/index', {
      welcome: 'Welcome to the ToDo Manager.',
      notes: 'Drive your tasks and make your things done!',
    });
    */

    //ctx.res.sendFile(indexPath);
    ctx.render('');

  });
};
