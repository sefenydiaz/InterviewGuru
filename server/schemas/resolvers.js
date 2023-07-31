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
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw){
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
      return await Answer.create(args);
    },
    getFeedback: async (parent, args) => {
      const prompt = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an interviewer for a Data Analytics company for a Fortune 500 company. You just asked the following question: Can you provide an example of a data analytics project you have worked on, including the steps you took to gather and analyze the data, the insights you derived from the analysis, and the impact it had on the business?",
          },
          {
            role: "user",
            content:
              "Can you rate this answer on a scale of 1 to 5 and a feedback statement using the STAR method? Answer: I once needed to find user satisfaction on a coffee pot using Amazon reviews for the product. First, I started by cleaning the data using several functions. Then I used bar graphs to show the customer satisfaction by grouping the reviews as either satisfied, neutral, or unsatisfied.",
          },
        ],
      });

      const feedbackData = prompt.data.choices[0].message.content;

      const feedback = await Feedback.create({ userFeedback: feedbackData });

      return feedback;
    },
    // addAnswerToQuestion: async (parent, { _id }, context) => {},
  },
};

module.exports = resolvers;
