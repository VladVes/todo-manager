export default (mongoose) => {
  const taskSchema = mongoose.Schema({
    header: {
      type: String,
      validate: {
        validator(value) {
          return value.length < 50;
        },
        message: `ToDo can be only 50 characters length`,
      },
      required: [true, 'task should have a content'],
    },
    priority: {
      type: String,
      validate: {
        validator(value) {
          return /hight|middle|low/i.test(value);
        },
        message: `${value} is not a valid priority`,
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
        message: `${value} is not a valid status`,
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
        message: `Deadline can't be today`,
      },
      required: [true, 'task should have a deadline'],
    }

  });

  taskSchema.methods.toString = function() {
    return `Task is: ${this.header}`;
  };

  return mongoose.model('Task', taskSchema);
};
