const typeDefs = `
type Question {
    question: String!
}

type Query {
    dummyQuery: String
}

type Mutation {
    addQuestion: Question
}
`;

module.exports = typeDefs;
