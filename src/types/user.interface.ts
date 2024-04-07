import { Request } from 'express';
import { Server } from 'socket.io';
export interface IUser {
  _id?: string;
  name: string;
  email?: string;
  password: string;
  isPasswordMatch(password: string): Promise<boolean>;
}
export interface AuthenticatedRequest extends Request {
  user?: IUser;
  userId?: string;
  io?:Server;
}