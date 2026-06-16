const Blog = require('./blog.model');
const { getPagination } = require('../../utils/pagination');

// GET ALL ADMIN BLOGS
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const totalCount = await Blog.countDocuments();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      totalCount,
      currentPage: page,
      limit,
      data: blogs
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Blog created",
      data: blog
    });

  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      data: blog
    });

  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      message: "Blog deleted"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};