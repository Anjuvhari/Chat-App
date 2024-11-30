const db = require('../config/database');

const ChatModel = {
    async saveMessage(message) {
        const [result] = await db.execute(
            'INSERT INTO chat_messages (user_id, activity_id, message) VALUES (?, ?, ?)',
            [message.userId, message.activityId, message.message]
        );
        return result.insertId;
    },

    async getMessagesByActivity(activityId) {
        const [rows] = await db.execute(`
            SELECT cm.*, u.username 
            FROM chat_messages cm
            JOIN users u ON cm.user_id = u.id
            WHERE cm.activity_id = ?
            ORDER BY cm.timestamp
        `, [activityId]);
        return rows;
    }
};

module.exports = ChatModel;