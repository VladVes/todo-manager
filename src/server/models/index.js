import mongoose from 'mongoose';
import task from './tasks';
import queue from './queue';
import getLogger from '../lib/log';
import getConfig from '../../../config/config';

const log = getLogger('DB');
const env = process.env.NODE_ENV || 'development';
const config = getConfig()[env];

if (config.use_env_variable) {
  mongoose.connect(process.env[config.use_env_variable]);
} else {
  mongoose.connect(config.connectionString);
}

const db = mongoose.connection;
db.on('error', (e) => {
  log('db connection error', e);
  throw new Error(e);
});
db.once('open', () => {
  log('connected to mongoDb');
});

const Task = task(mongoose);
const Queue = queue(mongoose);

export { Task, Queue };
