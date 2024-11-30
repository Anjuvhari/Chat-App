const db = require('../config/database');

const ActivityModel = {
    async create(activity) {
        const [result] = await db.execute(
            'INSERT INTO activities (title, description, creator_id, location, date, max_participants) VALUES (?, ?, ?, ?, ?, ?)',
            [
                activity.title, 
                activity.description, 
                activity.creator_id, 
                activity.location, 
                activity.date, 
                activity.max_participants
            ]
        );
        return result.insertId;
    },

    async findAll() {
        const [rows] = await db.execute(`
            SELECT a.*, 
                   u.username as creator_name, 
                   COUNT(ap.user_id) as current_participants 
            FROM activities a
            LEFT JOIN users u ON a.creator_id = u.id
            LEFT JOIN activity_participants ap ON a.id = ap.activity_id
            GROUP BY a.id
        `);
        return rows;
    },

    async joinActivity(activityId, userId) {
        // Check if user already joined
        const [existingJoins] = await db.execute(
            'SELECT * FROM activity_participants WHERE activity_id = ? AND user_id = ?',
            [activityId, userId]
        );

        if (existingJoins.length > 0) {
            return { alreadyJoined: true };
        }

        // Check activity capacity
        const [activityDetails] = await db.execute(
            'SELECT max_participants FROM activities WHERE id = ?',
            [activityId]
        );

        const [currentParticipants] = await db.execute(
            'SELECT COUNT(*) as count FROM activity_participants WHERE activity_id = ?',
            [activityId]
        );

        if (currentParticipants[0].count >= activityDetails[0].max_participants) {
            return { activityFull: true };
        }

        // Join activity
        await db.execute(
            'INSERT INTO activity_participants (activity_id, user_id, status) VALUES (?, ?, ?)',
            [activityId, userId, 'joined']
        );

        return { success: true };
    }
};

module.exports = ActivityModel;