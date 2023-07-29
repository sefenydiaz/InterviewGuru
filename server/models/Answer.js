const mongoose = require("mongoose");

const { Schema } = mongoose;

const answerSchema = new Schema({
  userAnswer: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
