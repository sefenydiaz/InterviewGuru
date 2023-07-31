const typeDefs = `
type User {
    _id: ID
    name: String
    email: String
    password: String
}

type Industry {
    _id : ID!
    name: String!
}

type Question {
    _id: ID!
    question: String!
    answer: Answer
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
    addQuestion: Question!
    addAnswer(userAnswer: String!): Answer!
    getFeedback: Feedback!
    
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
