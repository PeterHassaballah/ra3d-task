import { Server, Socket } from 'socket.io';
import { createNotification } from './services/notifications';
import { ITask } from './types/task.interface';

// Function to handle new notification event
// function handleNewNotification(io: Server, socket: Socket, notification: any) {
//     io.emit('newNotification', notification);
// }

// Export Socket.io event handlers
export function initializeSocket(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log('A user connected');
        // Handle taskAdded (assigned) event
        socket.on("taskAssigned", (task:ITask) => {
            //create task assigned notification
            createNotification(`Task ${task._id} assigned to you`,task.userId);
        });

        // Handle taskUpdated event
        socket.on("taskUpdated", (task:ITask) => {
            //create assigned task updated notification
            createNotification(`Task ${task._id} updated`,task.userId);
        });

    });
}