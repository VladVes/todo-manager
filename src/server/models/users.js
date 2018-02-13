import emailValidator from 'email-validator';

export default (mongoose) => {
  const userSchema = mongoose.Schema({
    email: {
      type: String,
      validate: {
        validator(value) {
          return emailValidator.validate(value);
        },
        message: 'Not a valid email',
      },
      required: [true, 'email required'],
    },
    firstName: {
      type: String,
      validate: {
        validator(value) {
          return value.length < 30;
        },
        message: 'First name can be only 30 characters long',
      },
      default: 'no name',
    },
    lastName: {
      type: String,
      validate: {
        validator(value) {
          return value.length < 30;
        },
        message: 'Last name can be only 30 characters long',
      },
      default: 'no name',
    },
    passwordDigest: {
      type: String,
      required: [true, 'password required'],
    },
  });

  return mongoose.model('User', userSchema);
};
