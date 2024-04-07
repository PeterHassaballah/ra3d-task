import mongoose from 'mongoose';
import { INotification } from '../types/notification.interface';

const notificationSchema = new mongoose.Schema<INotification>({
    message:String,
    userId: String
  });
  
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;