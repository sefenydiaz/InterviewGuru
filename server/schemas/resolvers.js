const { User, Question, Answer, Feedback, Industry } = require("../models");
const { signToken, AuthenticationError, openAI } = require("../utils");

const resolvers = {
  Query: {
    questions: async () => {
      return await Question.find();
    },
    question: async (parent, { _id }) => {
      return await Question.findById(_id);
    },
    answers: async () => {
      return await Answer.find();
    },
    answer: async (parent, { _id }) => {
      return await Answer.findById(_id);
    },
    allFeedback: async () => {
      return await Feedback.find();
    },
    feedback: async (parent, { _id }) => {
      return await Feedback.findById(_id);
    },
    allUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    findUserById: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    industries: async () => {
      return await Industry.find();
    },
  },
  Mutation: {
    addUser: async (parent, {name, email, password}) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if(!user){
        console.log("user not found")
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw){
        console.log('incorrect/no pw')
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user }

    },
    addQuestion: async (parent, args) => {
      const prompt = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an interviewer for a Data Analytics company for a Fortune 500 company.",
          },
          {
            role: "user",
            content: "What is one question you have for me for a candidate?",
          },
        ],
      });

      const questionData = prompt.data.choices[0].message.content;

      const question = await Question.create({ question: questionData });

      return question;
    },
    addAnswer: async (parent, args) => {
      const question = await Question.findByIdAndUpdate(args._id, {
        answer: { userAnswer: args.answer },
      });

      return question;
    },
    getFeedback: async (parent, args) => {
      const question = await Question.findById(args._id);

      const answer = question.answer.userAnswer;

      const prompt = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an interviewer for a Data Analytics company for a Fortune 500 company. You just asked the following question: ${question}`,
          },
          {
            role: "user",
            content: `Can you rate this answer on a scale of 1 to 5 and a feedback statement using the STAR method? Answer: ${answer}.`,
          },
        ],
      });

      const feedbackData = prompt.data.choices[0].message.content;

      return await Question.findByIdAndUpdate(question._id, {
        feedback: { userFeedback: feedbackData },
      });
    },
    // addAnswerToQuestion: async (parent, { _id }, context) => {},
  },
};

module.exports = resolvers;
