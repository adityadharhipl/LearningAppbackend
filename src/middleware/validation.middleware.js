// Validation Middleware
const { validationResult } = require('express-validator');
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};
