import start from './start';
import dataTest from './dataTest';

const controllers = [start, dataTest];

export default router => controllers.forEach(f => f(router));
