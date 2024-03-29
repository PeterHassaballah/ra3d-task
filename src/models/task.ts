import mongoose from 'mongoose';
import { ITask } from '../types/task.interface';

const taskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },   // this will hold the current userId
    assignedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },   // this will hold the userId by whom the task was assigned
    status: { type: String, enum: ["pending", "inProgress", "completed"], default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: { type: Date, required: true },

}, { versionKey: false, timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;