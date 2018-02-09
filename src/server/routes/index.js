import start from './start';

const controllers = [start];

export default router => controllers.forEach(f => f(router));
