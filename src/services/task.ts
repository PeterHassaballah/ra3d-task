import Task from '../models/task'; 
import { ITask } from '../types/task.interface';
import ApiError from '../utils/ApiError';
import dayjs from 'dayjs';
// Get all tasks
export const getAllTasks = async (): Promise<ITask[]> => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new ApiError(500,'Failed to fetch tasks');
  }
};
export const getTaskById = async(taskId:string,uId:string):Promise<ITask>=>{
    try{
      
    const task = await Task.findById(taskId);
    // check if userId owns the task
    if(task.assignedBy===uId || task.userId===uId){
      // user is either assignee or owner
      return task;
    }
    throw new ApiError(403,'User not authorized to access task',false);
    }
    catch(err){
      throw new ApiError(500,'Failed to find task');
    }
}
// Create a new task
export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  try {
    if(!taskData.dueDate){
      const currentDate = dayjs();
      taskData.dueDate= currentDate.add(1, 'week').toDate();
    }
    const newTask = await Task.create(taskData);
    if(!newTask){
        throw new ApiError(500,'Task Creation failed');
    }
    return newTask;
  } catch (error:any) {
    throw new ApiError(500,'Failed to create task',true,error?.message);
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
