const typeDefs = `
type User {
    _id: ID!
    name: String
    email: String
    password: String
}

type Question {
    _id: ID!
    question: String!
    answer: Answer
    feedback: Feedback
}

type Answer {
    _id: ID!
    userAnswer: String!
}

type Feedback {
    _id: ID!
    userFeedback: String!
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    questions: [Question!]
    question(_id: ID!): Question!
    answers: [Answer!]
    answer: Answer!
    allFeedback: [Feedback!]
    feedback(_id: ID!): Feedback!
    allUsers: [User!]
    findUserById(id: ID!): User!
    industries: [Industry!]
}

type Mutation {
    addQuestion(industry: String!, role: String!, experience: String!): Question!
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addAnswer(_id: String!, answer: String!): Question!
    getFeedback(_id: String!): Question!
}
`;

module.exports = typeDefs;
