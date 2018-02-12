export default (mongoose) => {
  const queueSchema = mongoose.Schema({
    taskId: {
      type: String,
      unique: true,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  });

  return mongoose.model('Queue', queueSchema);
};
