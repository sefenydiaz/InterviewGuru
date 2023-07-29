const typeDefs = `
type Question {
    _id: ID!
    question: String!
}

type Query {
    questions: [Question]
    question(_id: ID!): Question
}

type Mutation {
    addQuestion: Question
}
`;

module.exports = typeDefs;
