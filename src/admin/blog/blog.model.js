const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  image: { type: String }, 
  category: { type: String }, 
  author: {
    name: { type: String },
    image: { type: String }
  },
  price: { type: String }, 
  views: { type: String, default: "0" },
  isFeatured: { type: Boolean, default: false },
  isMarketing: { type: Boolean, default: false }, 
  tags: [{ type: String }],
  readTime: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
