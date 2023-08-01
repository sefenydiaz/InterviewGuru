const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
