import { RequestHandler,Response } from 'express';
import * as taskService from '../services/task';
import {AuthenticatedRequest} from '../types/user.interface';

export const getAllTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getTask:RequestHandler = async (req, res) => {
    try {
    const taskId = req.params.taskId;
    const userId = 'req.user';
    const task = await taskService.getTaskById(taskId,userId);
      if(!task){
          return res.status(404).json({'message':'No matching Id found'});
      }
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

export const createTask = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const payload=req.body;
    const userId = req.userId;
    const newTask = await taskService.createTask({...payload,assignedBy:userId});
    if(!newTask){      
      return res.status(400).json({ message: 'Failed to create task' });
    }
    return res.status(201).json(newTask);
  } catch (error:any) {
    console.log("the error",error);
    return res.status(400).json({ message: `Error in Taskcreation: ${error.message}` });
  }
};
export const getUserTasks = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const userId = req.userId;
    const tasks = await taskService.getMyTasks(userId);
    return res.status(200).json(tasks);
  } catch (error:any) {
    console.log("the error",error);
    return res.status(500).json({ message: `Cannot get user tasks ${error?.message}` });
  }
};

export const updateTask = async (req:AuthenticatedRequest, res:Response) => {
  const taskId = req.params.taskId;
  try {
    const updatedTask = await taskService.updateTask(taskId, req.body);
    if(!updatedTask){

    }
    if(updatedTask.userId){
      req.io.emit('taskUpdated', updatedTask);
    }
    return res.json(updatedTask);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update task' });
  }
};
export const assignTask = async (req:AuthenticatedRequest, res:Response) => {
  const taskId = req.params.taskId;
  try {
    const assignedTask = await taskService.assignToUser(taskId, req.body);
    if(!assignedTask){
      return res.status(400).json({message:'Error assigning task'});
    }
    req.io.emit('taskAssigned', assignedTask);
    return res.status(200).json({data:assignedTask});
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update task' });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await taskService.deleteTask(taskId);
    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ message: 'Failed to delete task' });
  }
};
