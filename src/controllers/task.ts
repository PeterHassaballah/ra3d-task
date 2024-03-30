import { RequestHandler,Response } from 'express';
import * as taskService from '../services/task';
import { Server } from 'socket.io';
import { AuthenticatedRequest } from 'src/types/user.interface';
// import {AuthenticatedRequest} from '../types/user.interface';
let io: Server; // Assuming you have already initialized Socket.IO server

export const getAllTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getTask:RequestHandler = async (req, res) => {
    try {
    const taskId = req.params.id;
    const userId = 'req.user';
    const task = await taskService.getTaskById(taskId,userId);
      if(!task){
          res.status(404).json({'message':'No matching Id found'});
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const createTask = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const payload=req.body;
    const userId = req.userId;
    const newTask = await taskService.createTask({...payload,assignedBy:userId});
    if(!newTask){      
      res.status(400).json({ message: 'Failed to create task' });
    }
    io.emit('taskAdded', newTask);
    res.status(201).json(newTask);
  } catch (error:any) {
    console.log("the error",error);
    res.status(400).json({ message: `Error in Taskcreation: ${error.message}` });
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await taskService.updateTask(taskId, req.body);
    if(!updatedTask){

    }
    io.emit('taskUpdated', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update task' });
  }
};
export const assignTask: RequestHandler = async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await taskService.updateTask(taskId, req.body);
    if(!updatedTask){

    }
    io.emit('taskUpdated', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update task' });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  const taskId = req.params.id;
  try {
    await taskService.deleteTask(taskId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete task' });
  }
};
