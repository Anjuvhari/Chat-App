const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(detail => detail.message)
            });
        }

        next();
    };
};

// Example validation schema (using Joi)
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const createActivitySchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500),
    location: Joi.string().max(255),
    date: Joi.date().iso().required(),
    max_participants: Joi.number().min(1).max(100).required()
});

module.exports = {
    validateRequest,
    registerSchema,
    createActivitySchema
};