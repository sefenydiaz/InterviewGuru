const mongoose = require("mongoose");

const { Schema } = mongoose;

const answerSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: answerSchema,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
