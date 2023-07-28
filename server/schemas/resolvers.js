const { User } = require("../models");
const { signToken, AuthenticationError, openAI } = require("../utils");

const resolvers = {
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

      return prompt;
    },
  },
};

module.exports = resolvers;
