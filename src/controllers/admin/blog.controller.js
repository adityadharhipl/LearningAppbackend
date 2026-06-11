const Blog = require('../../models/Blog');

// Get all blogs (admin)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// Create a new blog (admin)
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    return res.status(201).json({ success: true, message: 'Blog created successful', data: blog });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
// Update an existing blog (admin)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    return res.json({ success: true, data: blog });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
// Delete a blog (admin)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    return res.json({ success: true, message: 'Blog deleted successful' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
