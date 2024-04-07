import Notification from '../models/notification';
import ApiError from '../utils/ApiError';
// Create notification
export const createNotification =  (message:string, userId:string) => {
    try {
      const notification = Notification.create({ message, userId });
      return notification;
  
    } catch (err) {
        console.log("error getting notification",err);
        return err;
    }
  }
  
  // Get notifications for a user
  export const getNotifcations =async (userId:string) => {
    try {
      const notifications = await Notification.find({ userId });
      return notifications;
    } catch (err) {
        console.log("error getting notification",err);
        throw new ApiError(500,'Failed to get notification');
    }
  }