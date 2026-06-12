// Validation Middleware
// Reads express-validator errors and returns a 400 response if any exist

const { validationResult } = require('express-validator');

/**
 * checkValidation
 * Place this middleware AFTER your express-validator rule arrays in a route.
 * It will automatically send a 400 JSON response if validation fails.
 */
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};
