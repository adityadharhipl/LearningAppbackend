const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const adminAuth = require('../../middlewares/adminAuth');
const {
  createLanding,
  getLanding,
  updateLanding,
  deleteLanding,
} = require('../../controllers/admin/landing.controller');


const landingValidationRules = [
  body('hero.title').optional().isString().withMessage('Hero title must be a string'),
  body('hero.subtitle').optional().isString().withMessage('Hero subtitle must be a string'),
  body('hero.description').optional().isString().withMessage('Hero description must be a string'),
  body('hero.image').optional().isString().withMessage('Hero image must be a string'),
  body('hero.buttonText').optional().isString().withMessage('Hero buttonText must be a string'),
  body('statistics.students').optional().isNumeric().withMessage('students must be a number'),
  body('statistics.courses').optional().isNumeric().withMessage('courses must be a number'),
  body('statistics.teachers').optional().isNumeric().withMessage('teachers must be a number'),
  body('statistics.reviews').optional().isNumeric().withMessage('reviews must be a number'),
  // Add more rules for nested arrays (features, popularCourses, etc.) as needed
];

// Middleware to send validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Create landing page
router.post('/', adminAuth, landingValidationRules, handleValidation, createLanding);

// Get landing page (single document assumed)
router.get('/', adminAuth, getLanding);

// Update landing page by ID – reuse same validation rules
router.put('/:id', adminAuth, landingValidationRules, handleValidation, updateLanding);

// Delete landing page by ID
router.delete('/:id', adminAuth, deleteLanding);

module.exports = router;