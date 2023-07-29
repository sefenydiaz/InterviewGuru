const mongoose = require("mongoose");

const { Schema } = mongoose;
const Answer = require("./Answer");

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: Answer.schema,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
