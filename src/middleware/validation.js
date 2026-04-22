const { body, validationResult } = require('express-validator');

const shelterRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().isLength({ min: 2, max: 2 }).withMessage('State must be a 2-letter code'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  body('current_occupancy').optional().isInt({ min: 0 }).withMessage('Current occupancy must be >= 0'),
  body('coordinator_name').notEmpty().withMessage('Coordinator name is required'),
  body('coordinator_phone').notEmpty().withMessage('Coordinator phone is required'),
  body('needs').optional().isArray().withMessage('Needs must be an array'),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
}

module.exports = { shelterRules, validate };
