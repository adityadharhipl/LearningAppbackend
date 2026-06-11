const Blog = require('../models/Blog');


exports.getAllBlogsAdmin = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, data: blogs });
};


exports.createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json({ success: true, message: "Blog added successfully!" });
};


exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: blog });
};


exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Blog deleted!" });
};