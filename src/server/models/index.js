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
  log('connected');
  console.lob.bind(console, 'we\'re connected!');
});



const newTask = new Task({ name: 'First task', description: 'get the things done'});

console.log(newTask.show());

const addTask = async (task) => {
  try {
    const savedTask = await task.save();
    console.log('FROM mongoose SAVE!');
    console.log(savedTask);
    return savedTask;
  } catch (e) {
    log(err);
    throw new Error(err);
  }
};

const savedTask = addTask(newTask);


db.mongoose = mongoose;

export default db;
