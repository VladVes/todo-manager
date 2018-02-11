import start from './start';
import tasks from './tasks';

const controllers = [start, tasks];

export default router => controllers.forEach(f => f(router));
