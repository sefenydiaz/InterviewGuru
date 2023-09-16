const { User, Question } = require("../models");
const { signToken, AuthenticationError, openAI } = require("../utils");

const resolvers = {
  Query: {
    questions: async () => {
      return await Question.find();
    },
    question: async (parent, { _id }) => {
      return await Question.findById(_id);
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
  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, { _id }) => {
      const deletedUser = await User.findByIdAndRemove(_id);

      return deletedUser;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("user not found");
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("incorrect/no pw");
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addQuestion: async (parent, args) => {
      const prompt = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an interviewer for a ${args.industry} company.`,
          },
          {
            role: "user",
            content: `What is one question you have for a ${args.role} candidate with ${args.experience} years experience?`,
          },
        ],
      });

      const questionData = prompt.data.choices[0].message.content;

      const question = await Question.create({
        question: questionData,
        industry: args.industry,
        role: args.role,
        experience: args.experience,
      });

      return question;
    },
    addAnswer: async (parent, args) => {
      const question = await Question.findByIdAndUpdate(
        args._id,
        {
          answer: args.answer,
        },
        { new: true }
      );

      return question;
    },
    getFeedback: async (parent, args) => {
      const question = await Question.findById(args._id);
      const answer = question.answer;
      const industry = question.industry;

      const prompt = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an interviewer for a ${industry} company. You just asked the following question: ${question}`,
          },
          {
            role: "user",
            content: `Can you rate this answer on a scale of 1 to 5 and provide a feedback statement using the STAR method? Answer: ${answer}.`,
          },
        ],
      });

      const feedbackData = prompt.data.choices[0].message.content;

      return await Question.findByIdAndUpdate(
        question._id,
        {
          feedback: feedbackData,
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
