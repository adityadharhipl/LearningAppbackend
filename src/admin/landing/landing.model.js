const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
    description: String,
    image: String,
    buttonText: String
  },

  statistics: {
    Students: { type: Number, default: 0 },
    Total_success: { type: Number, default: 0 },
    Main_question: { type: Number, default: 0 },
    Chief_experts: { type: Number, default: 0 },
    Year_of_exp: { type: Number, default: 0 }
  },

  CloudSoftware: [
    {
      title: String,
      description: String,
      icon: String
    }
  ],

  WhatIsTOTC: {
    title: String,
    description: String,

    ForInstructors: {
      title: String,
      image: String,
      buttonText: String
    },

    ForStudents: {
      title: String,
      image: String,
      buttonText: String
    }
  },

  EverythingYouCanDoWithTOTC: {
    title: String,
    highlightedText: String,
    description: String,
    image: String,
    buttonText: String,
    videoUrl: String
  },

  OurFeatures: {
    title: String,
    description: String,
    features: [
      {
        title: String,
        description: String,
        image: String
      }
    ]
  },

  ToolsForTeachers: [
    {
      title: String,
      description: String,
      image: String
    }
  ],

  AssessmentsQuizzesTests: {
    title: String,
    description: String,
    image: String
  },

  ClassManagementTools: {
    title: String,
    description: String,
    image: String
  },

  OneOnOneDiscussions: {
    title: String,
    description: String,
    image: String
  },

  IntegrationSection: {
    title: String,
    description: String,
    image: String
  },

  Testimonials: [
    {
      name: String,
      designation: String,
      image: String,
      review: String,
      rating: Number
    }
  ],

  LatestNewsAndResources: {
    title: String,
    description: String,

    featuredNews: {
      title: String,
      description: String,
      image: String,
      tag: String,
      readMoreLink: String
    },

    news: [
      {
        title: String,
        description: String,
        image: String,
        tag: String,
        date: String
      }
    ]
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.LandingPage || mongoose.model("LandingPage", landingPageSchema);
