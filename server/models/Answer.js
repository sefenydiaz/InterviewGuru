const mongoose = require("mongoose");

const { Schema } = mongoose;

const answerSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
