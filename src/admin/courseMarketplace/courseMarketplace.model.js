const mongoose = require("mongoose");

const CourseCardSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            default: null,
            trim: true,
        },
        image: String,
        category: String,
        duration: String,
        title: String,
        description: String,
        authorName: String,
        authorImage: String,
        price: Number,
        oldPrice: Number,
    },
    {
        _id: true,
    }
);

const CreatorSchema = new mongoose.Schema(
    {
        image: String,
        name: String,
        designation: String,
        description: String,
    },
    {
        _id: true,
    }
);

const TestimonialSchema = new mongoose.Schema(
    {
        image: String,
        name: String,
        designation: String,
        description: String,
    },
    {
        _id: true,
    }
);

const DealSchema = new mongoose.Schema(
    {
        image: String,
        percentage: String,
        title: String,
        description: String,
    },
    {
        _id: true,
    }
);

const CourseMarketplaceSchema = new mongoose.Schema(
    {
        heroSection: {
            bannerImage: String,
            searchPlaceholder: String,
            subjects: [String],
            partners: [String],
            programs: [String],
            languages: [String],
            availability: [String],
            learningTypes: [String],
        },
        featuredCourses: {
            title: String,
            cards: [CourseCardSchema]
        },

        learningBanner: {
            title: String,
            description: String,
            image: String,
            buttonText: String,
            buttonLink: String,
        },

        recommendedForYou: {
            title: String,
            cards: [CourseCardSchema],
        },

        classesTaughtByCreators: {
            title: String,
            cards: [CreatorSchema],
        },

        studentTestimonials: {
            title: String,
            testimonials: [TestimonialSchema],
        },

        educationDeals: {
            title: String,
            cards: [DealSchema],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "CourseMarketplace",
    CourseMarketplaceSchema
);  
