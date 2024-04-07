import { Server, Socket } from 'socket.io';
import { createNotification } from './services/notifications';
import { ITask } from './types/task.interface';

// Function to handle new notification event
// function handleNewNotification(io: Server, socket: Socket, notification: any) {
//     io.emit('newNotification', notification);
// }

// Export Socket.io event handlers
export function initializeSocket(io: Server) {
    console.log("socket init");
    io.on('connection', (socket: Socket) => {
        console.log('A user connected');
        // Handle taskAdded (assigned) event
        socket.on("taskAssigned", (task:ITask) => {
            //create task assigned notification
            console.log("A task has been assigned");
            const resp = createNotification(`Task ${task._id} assigned to you`,task.userId);
            console.log("response",resp);
        });

        // Handle taskUpdated event
        socket.on("taskUpdated", (task:ITask) => {
            //create assigned task updated notification
            console.log("A task has been updated");
            createNotification(`Task ${task._id} updated`,task.userId);
        });

    });
}