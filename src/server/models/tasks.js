export default (mongoose) => {
  const taskSchema = mongoose.Schema({
    header: {
      type: String,
      validate: {
        validator(value) {
          return value.length < 50;
        },
        message: 'ToDo can be only 50 characters length',
      },
      required: [true, 'task should have a content'],
    },
    order: {
      type: Number,
      unique: true,
      required: [true, 'task should have an order!'],
    },
    priority: {
      type: String,
      validate: {
        validator(value) {
          return /hight|middle|low/i.test(value);
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
