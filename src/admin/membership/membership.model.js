const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema(
  {
    pricingSection: {
      title: String,
      plans: [
        {
          name: String,
          tagLine: String,
          badge: String,

          price: {
            monthly: Number,
            yearly: Number,
          },

          duration: String,
          description: String,

          features: [
            {
              text: String,
              included: Boolean,
            },
          ],

          buttonText: String,
          buttonLink: String,

          isPopular: Boolean,
        },
      ],
    },

    coachingSection: {
      title: String,

      description: String,

      buttonText: String,

      faq: [
        {
          question: String,
          answer: String,
        },
      ],
    },

    testimonialSection: {
      title: String,

      students: [
        {
          image: String,
          name: String,
          designation: String,
          description: String,
        },
      ],
    },

    appSection: {
      title: String,

      androidButtonText: String,
      androidLink: String,

      iosButtonText: String,
      iosLink: String,
    },


    finalsections: [
      {
        type: {
          type: String,
          enum: ["teacher", "creator"],
        },
        image: String,
        title: String,
        description: String,
        buttonText: String,
        buttonLink: String,
      },
    ],
    // teacherSection: {
    //   image: String,

    //   title: String,

    //   description: String,

    //   buttonText: String,

    //   buttonLink: String,
    // },

    // courseCreatorSection: {
    //   image: String,

    //   title: String,

    //   description: String,

    //   buttonText: String,

    //   buttonLink: String,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Website ||
  mongoose.model("Website", websiteSchema);