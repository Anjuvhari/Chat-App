const chatService = require('../services/chatService');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('join_activity_room', (activityId) => {
            socket.join(`activity_${activityId}`);
        });

        socket.on('send_chat_message', async (messageData) => {
            try {
                const savedMessage = await chatService.saveMessage(messageData);
                io.to(`activity_${messageData.activityId}`).emit('receive_chat_message', savedMessage);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};