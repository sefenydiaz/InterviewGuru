const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Mutation: {
    addQuestion: async (parent, args) => {},
  },
};

module.exports = resolvers;
