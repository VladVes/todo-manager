export default (mongoose) => {
  const queueSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      default: 'order',
    },
    data: {
      type: Array,
      default: [],
      required: true,
    },
  });
  return mongoose.model('Queue', queueSchema);
};
