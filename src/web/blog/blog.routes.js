const router = require('express').Router();
const blogCtrl = require('./blog.controller');

// WEB APIs
router.get('/', blogCtrl.getAllBlogs);
router.get('/:id', blogCtrl.getBlogById);

module.exports = router;