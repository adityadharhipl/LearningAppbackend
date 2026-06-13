const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, 

  description: { type: String },
  content: { type: String },

  image: { type: String },

  category: { type: String, index: true },

  author: {
    name: String,
    image: String
  },

  tags: [{ type: String }],

  isFeatured: { type: Boolean, default: false },
  isMarketing: { type: Boolean, default: false },

  views: { type: Number, default: 0 },

  readTime: { type: String },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);