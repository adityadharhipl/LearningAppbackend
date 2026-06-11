const Blog = require('../../models/Blog');

// Get all blogs (public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single blog by ID (public)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    return res.json({ success: true, data: blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
