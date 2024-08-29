import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required: true}
});

const TaskModel = mongoose.model('taskSchema',taskSchema);

export default TaskModel;