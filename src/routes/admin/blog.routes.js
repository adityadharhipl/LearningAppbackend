const router = require('express').Router();
const blogCtrl = require('../../controllers/admin/blog.controller');

// Admin Blog CRUD routes
router.get('/', blogCtrl.getAllBlogsAdmin);
router.post('/add', blogCtrl.createBlog);
router.put('/edit/:id', blogCtrl.updateBlog);
router.delete('/delete/:id', blogCtrl.deleteBlog);

module.exports = router;
