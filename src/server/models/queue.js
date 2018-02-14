export default (mongoose) => {
  const queueSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      default: 'order',
    },
    data: {
      type: Array,
      required: true,
      default: [],
    },
  });
  return mongoose.model('Queue', queueSchema);
};
