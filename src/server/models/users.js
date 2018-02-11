import emailValidator from 'email-validator';

export default (mongoose) => {
  const userSchema = mongoose.Schema({
    email: {
      type: String,
      validate: {
        validator(value) {
          return emailValidator.validate(value);
        },
        message: `Not a valid email`,
      },
      required: [true, 'task should have a content'],
    },
    firstName: {
      type: String,
      validate: {
        validator(value) {
          return value.length < 30;
        },
        message: `First name can be only 30 characters long`,
      },
      required: [true, 'task should have a priority'],
    },
    lastName: {
      type: String,
      validate: {
        validator(value) {
            return value.length < 30;
        },
        message: `Last name can be only 30 characters long`,
      },
      required: [true, 'task should have a status'],
    },
    passwordDigest: {
      type: String,
    required: [true, 'password required'],
    },
  });

  taskSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };

  return mongoose.model('User', userSchema);
};
