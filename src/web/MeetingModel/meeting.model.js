const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    title: String,

    instructor: {
      name: String,
      image: String
    },

    channelName: String,

    startTime: Date,

    endTime: Date,

    status: {
      type: String,
      enum: [
        "upcoming",
        "live",
        "completed"
      ],
      default: "upcoming"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Meeting",
  MeetingSchema
);