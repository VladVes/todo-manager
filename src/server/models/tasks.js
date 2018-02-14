export default (mongoose) => {
  const taskSchema = mongoose.Schema({
    header: {
      type: String,
      validate: {
        validator(value) {
          console.log(value.length);
          return value.length < 51;
        },
        message: 'ToDo can be only 50 characters length',
      },
      required: [true, 'task should have a content'],
    },
    priority: {
      type: String,
      validate: {
        validator(value) {
          return /hight|medium|low/i.test(value);
        },
        message: 'Priority is invalid',
      },
      default: 'Low',
      required: [true, 'task should have a priority'],
    },
    status: {
      type: String,
      validate: {
        validator(value) {
          return /new|active|resolved|closed/i.test(value);
        },
        message: 'Status is not valid',
      },
      default: 'New',
      required: [true, 'task should have a status'],
    },
    deadLine: {
      type: String,
      validate: {
        validator(value) {
          return true; ///UPDATE validator!!!
        },
        message: 'Deadline can\'t be today',
      },
      default: 'tomorrow',
      required: [true, 'task should have a deadline'],
    },
  });

  taskSchema.methods.toString = function() {
    return `Task is: ${this.header}`;
  };

  return mongoose.model('Task', taskSchema);
};
