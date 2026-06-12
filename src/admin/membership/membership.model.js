const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      monthly: { type: Number, default: 0 },
      yearly: { type: Number, default: 0 },
    },

    description: {
      type: String,
    },

    features: [
      {
        text: { type: String },
        included: { type: Boolean, default: true },
      },
    ],

    isPopular: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    buttonText: {
      type: String,
      default: 'Get Started',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Membership || mongoose.model('Membership', membershipSchema);
