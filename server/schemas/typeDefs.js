const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
}

type Industry {
    _id : ID!
    name: String!
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
    token: ID
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
    addQuestion: Question!
    addAnswer(_id: String!, answer: String!): Question!
    getFeedback(_id: String!): Question!
}
`;

module.exports = typeDefs;
