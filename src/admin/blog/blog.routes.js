const router = require('express').Router();
const blogCtrl = require('./blog.controller');

// ADMIN CRUD
router.get('/', blogCtrl.getAllBlogsAdmin);
router.post('/add', blogCtrl.createBlog);
router.put('/edit/:id', blogCtrl.updateBlog);
router.delete('/delete/:id', blogCtrl.deleteBlog);

module.exports = router;