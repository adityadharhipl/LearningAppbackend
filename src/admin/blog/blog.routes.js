const router = require("express").Router();
const blogCtrl = require("./blog.controller");

router.get("/", blogCtrl.getAllBlogsAdmin);

router.get("/:id", blogCtrl.getBlogAdminById);

router.post("/add", blogCtrl.createBlog);

router.put("/edit/:id", blogCtrl.updateBlog);

router.delete("/delete/:id", blogCtrl.deleteBlog);

module.exports = router;