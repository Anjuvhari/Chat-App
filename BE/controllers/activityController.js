const activityModel = require('../models/activityModel');

exports.createActivity = async (req, res) => {
    try {
        const { title, description, location, date, max_participants } = req.body;
        const creatorId = req.user.id;

        const newActivity = {
            title,
            description,
            creator_id: creatorId,
            location,
            date,
            max_participants
        };

        const activityId = await activityModel.create(newActivity);

        // Automatically add creator as first participant
        await activityModel.joinActivity(activityId, creatorId);

        res.status(201).json({ 
            message: 'Activity created successfully', 
            activityId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getActivities = async (req, res) => {
    try {
        const activities = await activityModel.findAll();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.joinActivity = async (req, res) => {
    try {
        const { activityId } = req.params;
        const userId = req.user.id;

        const result = await activityModel.joinActivity(activityId, userId);

        if (result.alreadyJoined) {
            return res.status(400).json({ message: 'Already joined this activity' });
        }

        if (result.activityFull) {
            return res.status(400).json({ message: 'Activity is full' });
        }

        res.json({ message: 'Joined activity successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};