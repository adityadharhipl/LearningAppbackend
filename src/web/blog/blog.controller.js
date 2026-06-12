const Blog = require('./blog.model');
const { getPagination } = require('../../utils/pagination');

/**
 * GET /api/v1/web/blogs
 * Returns blogs organized by UI sections:
 *  - featuredBlog       → isFeatured: true  (top hero blog)
 *  - readingBlogList    → all blogs grouped by category
 *  - relatedBlogs       → latest blogs (paginated)
 *  - marketingArticles  → isMarketing: true
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    // ── 1. Featured Blog (hero section) ──────────────────────────────
    const featuredBlog = await Blog.findOne({ isFeatured: true })
      .sort({ createdAt: -1 });

    // ── 2. Reading Blog List (grouped by category) ────────────────────
    //    Get all unique categories
    const categories = await Blog.distinct('category');

    const readingBlogList = {};
    for (const cat of categories) {
      if (!cat) continue;
      readingBlogList[cat] = await Blog.find({ category: cat })
        .sort({ createdAt: -1 })
        .limit(4);
    }

    // ── 3. Related Blogs (paginated, latest) ──────────────────────────
    const totalCount   = await Blog.countDocuments();
    const totalPages   = Math.ceil(totalCount / limit);
    const relatedBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ── 4. Marketing Articles ─────────────────────────────────────────
    const marketingArticles = await Blog.find({ isMarketing: true })
      .sort({ createdAt: -1 })
      .limit(4);

    return res.json({
      success: true,

      // Hero featured blog
      featuredBlog,

      // Category-wise reading list  e.g. { "Inspiration": [...], "React": [...] }
      readingBlogList,

      // Related / latest blogs with pagination
      relatedBlogs: {
        length:      relatedBlogs.length,
        totalCount,
        totalPages,
        currentPage: page,
        limit,
        data:        relatedBlogs
      },

      // Marketing articles section
      marketingArticles: {
        length: marketingArticles.length,
        data:   marketingArticles
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/v1/web/blogs/:id
 * Returns full details of a single blog
 */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    return res.json({ success: true, blogDetails: blog, data: blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
