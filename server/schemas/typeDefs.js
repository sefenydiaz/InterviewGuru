const typeDefs = `
type Question {
    question: String!
}

type Query {
    dummyQuery: String
}

type Mutation {
    addQuestion(question: String!): Question
}
`;

module.exports = typeDefs;
