export default (mongoose) => {
  const queueSchema = mongoose.Schema({
    order: {
      type: Array,
      default: [],
      required: true,
    },
  });
  return mongoose.model('Queue', queueSchema);
};
