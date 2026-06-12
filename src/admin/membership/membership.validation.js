const { body } = require('express-validator');

exports.createMembershipValidation = [
  body('name')
    .notEmpty()
    .withMessage('Plan name is required'),

  body('price.monthly')
    .optional()
    .isNumeric()
    .withMessage('Monthly price must be a number'),

  body('price.yearly')
    .optional()
    .isNumeric()
    .withMessage('Yearly price must be a number'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),

  body('features.*.text')
    .optional()
    .isString()
    .withMessage('Feature text must be a string'),

  body('features.*.included')
    .optional()
    .isBoolean()
    .withMessage('Feature included must be boolean'),

  body('isPopular')
    .optional()
    .isBoolean()
    .withMessage('isPopular must be a boolean'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('buttonText')
    .optional()
    .isString()
    .withMessage('buttonText must be a string'),
];

exports.updateMembershipValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Plan name cannot be empty'),

  body('price.monthly')
    .optional()
    .isNumeric()
    .withMessage('Monthly price must be a number'),

  body('price.yearly')
    .optional()
    .isNumeric()
    .withMessage('Yearly price must be a number'),

  body('isPopular')
    .optional()
    .isBoolean()
    .withMessage('isPopular must be a boolean'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
];
