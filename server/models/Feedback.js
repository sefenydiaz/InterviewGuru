const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  userFeedback: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
