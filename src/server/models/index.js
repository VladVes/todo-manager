import mongoose from 'mongoose';
import dotenv from 'dotenv';
import task from './tasks';
import user from './users';
import getLogger from '../lib/log';
import getConfig from '../../../config/config';

dotenv.config();
const log = getLogger('DB');
console.log(process.env.NODE_ENV);
const config = getConfig()[process.env.NODE_ENV];

if (config.use_env_variable) {
  mongoose.connect(config.use_env_variable);
} else {
  mongoose.connect(config.connectionString);
}

const db = mongoose.connection;
db.on('error', (e) => {
  log('db connection error', e);
  console.error.bind(console, 'connection error:');
  throw new Error(e);
});
db.once('open', () => {
  log('connected to mongoDb');
  console.log.bind(console, 'we\'re connected!');
});

const Task = task(mongoose);
const User = user(mongoose);

export { Task, User };
