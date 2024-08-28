import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TaskModel = mongoose.model('taskSchema',taskSchema);

export default TaskModel;