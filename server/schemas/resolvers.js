const { User } = require('../models/User')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return await User.find({})
        }
    }
}