const calculate = () => {

};
export default (mongoose) => {
  const taskSchema = mongoose.Schema({
    header: String,
    priority: String,
    status: String,
    deadLine: calculate();

    }
  });
  taskSchema.methods.show = function() {
    return `Task is ${this.name} and it's about ${this.description}`;
  };

  const Task = mongoose.model('Task', taskSchema);
}
