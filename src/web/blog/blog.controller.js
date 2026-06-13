const Blog = require('./blog.model');
const { getPagination } = require('../../utils/pagination');

// GET ALL BLOGS (WEB UI)
exports.getAllBlogs = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    // 🔥 FEATURED BLOG
    const featuredBlog = await Blog.findOne({ isFeatured: true })
      .sort({ createdAt: -1 });

    // 🔥 CATEGORY WISE BLOGS
    const categories = await Blog.distinct('category');

   const readingBlogList = {};

await Promise.all(
  categories.map(async (cat) => {
    const blogs = await Blog.find({
      category: cat,
      isMarketing: false
    })
      .sort({ createdAt: -1 })
      .limit(4);

    readingBlogList[cat] = blogs;
  })
);

    // 🔥 RELATED BLOGS (LATEST)
    const totalCount = await Blog.countDocuments();

    const relatedBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔥 MARKETING ARTICLES
    const marketingArticles = await Blog.find({ isMarketing: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      featuredBlog,
      readingBlogList,
      relatedBlogs: {
        totalCount,
        currentPage: page,
        limit,
        data: relatedBlogs
      },
      marketingArticles
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// GET SINGLE BLOG
// exports.getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found"
//       });
//     }

//     res.json({
//       success: true,
//       data: blog
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };



exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const { page = 1, limit = 4 } = req.query;
    const skip = (page - 1) * limit;

    // 1. GET MAIN BLOG
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // 2. INCREASE VIEWS
    await Blog.findByIdAndUpdate(id, {
      $inc: { views: 1 }
    });

    // 3. BUILD RELATED QUERY (exclude current blog)
    const relatedQuery = {
      _id: { $ne: blog._id },
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags || [] } }
      ]
    };

    // 4. TOTAL COUNT
    const totalCount = await Blog.countDocuments(relatedQuery);

    // 5. FETCH RELATED BLOGS
    const relatedBlogs = await Blog.find(relatedQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // 6. RESPONSE
    res.status(200).json({
      success: true,
      data: blog,
      relatedBlogs: {
        totalCount,
        currentPage: Number(page),
        limit: Number(limit),
        data: relatedBlogs
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};