const typeDefs = `
type Question {
    _id: ID!
    question: String!
}

type Query {
    questions: [Question]
}

type Mutation {
    addQuestion: Question
}
`;

module.exports = typeDefs;
