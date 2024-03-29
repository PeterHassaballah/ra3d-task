import Task from '../models/task'; 
import { ITask } from 'src/types/task.interface';
import ApiError from 'src/utils/ApiError';

// Get all tasks
export const getAllTasks = async (): Promise<ITask[]> => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new ApiError(500,'Failed to fetch tasks');
  }
};
export const getTaskById = async(taskId:string):Promise<ITask>=>{
    const task = await Task.findById(taskId);
    return task;
}
// Create a new task
export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  try {
    const newTask = await Task.create(taskData);
    if(!newTask){
        throw new ApiError(500,'Failed to create task');
    }
    return newTask;
  } catch (error) {
    throw new ApiError(500,'Failed to create task');
  }
};

// Update a task
export const updateTask = async (taskId: string, taskData: Partial<ITask>): Promise<ITask> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    if (!updatedTask) {
      throw new ApiError(404,'Task not found',false);
    }
    return updatedTask;
  } catch (error) {
    throw new ApiError(500,'Failed to update task');
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    return await Task.findByIdAndDelete(taskId);
  } catch (error) {
    throw new ApiError(500,'Failed to delete task');
  }
};
