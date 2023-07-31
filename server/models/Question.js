const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  userFeedback: {
    type: String,
    required: false,
  },
});

const answerSchema = new Schema({
  userAnswer: {
    type: String,
    required: false,
  },
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: answerSchema,
  feedback: feedbackSchema,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
