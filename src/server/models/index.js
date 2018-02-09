import mongoose from 'mongoose';
import getLogger from '../lib/log';
import getConfig from '../../../config/config.js';

const log = getLogger('DB');
console.log(process.env.NODE_ENV);
const config = getConfig()[process.env.NODE_ENV];

if (config.use_env_variable) {
  mongoose.connect(config.use_env_variable);
} else {
  mongoose.connect(config.storage);
}

const db = mongoose.connection;
db.on('error', (e) => {
  log('db connection error', e);
  console.error.bind(console, 'connection error:');
  throw new Error(e);
});
db.once('open', function() {
  log('we\'re connected!');
  console.error.bind(console, 'we\'re connected!');
});

const taskSchema = mongoose.Schema({
  name: String,
  description: String,
});
taskSchema.methods.getDesc = function() {
  return `Task is ${this.name} and it's about ${this.description}`;
};

const Task = mongoose.model('Task', taskSchema);
const newTask = new Task({ name: 'First task', description: 'get the things done'});

console.log(newTask.getDesc());

db.mongoose = mongoose;

export default db;
