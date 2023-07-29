const { User, Question} = require("../models");
import Industry from "../models/Industry";
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
      try{
        const users = await User.find();
        return users
      } catch (error) {
        console.log(error)
      }
    },
    findUserById: async (_, { id }) => {
      try{
        const user = await User.findById(id);
        return user
      } catch (error){
        console.log(error)
      }
    },
    industry: async () => {
      return await Industry.find();
    }
  },
  Mutation: {
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
  },
};

module.exports = resolvers;
