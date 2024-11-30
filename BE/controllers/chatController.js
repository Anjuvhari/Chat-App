const chatModel = require('../models/chatModel');

exports.getChatMessages = async (req, res) => {
    try {
        const { activityId } = req.params;
        const messages = await chatModel.getMessagesByActivity(activityId);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};