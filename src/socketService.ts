import { Server, Socket } from 'socket.io';

// Function to handle new notification event
function handleNewNotification(io: Server, socket: Socket, notification: any) {
    io.emit('newNotification', notification);
}

// Export Socket.io event handlers
export function initializeSocket(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        // Listen for 'newNotification' event
        socket.on('newNotification', (notification: any) => {
            handleNewNotification(io, socket, notification);
        });
        // Handle taskAdded (assigned) event
        socket.on("taskAdded", (taskId: string) => {
            io.emit("taskAdded", `Task added: ${taskId}`);
        });

        // Handle taskUpdated event
        socket.on("taskUpdated", (taskId: string) => {
            io.emit("taskUpdated", `Task updated: ${taskId}`);
        });

    });
}