const router = require('express').Router();
const blogCtrl = require('./blog.controller');

// Get all blogs (public)
router.get('/', blogCtrl.getAllBlogs);

// Get a single blog by ID (public)
router.get('/:id', blogCtrl.getBlogById);

module.exports = router;
