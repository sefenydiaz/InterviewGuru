import {
  addUser,
  login,
  allUsers,
  findUserById,
  deleteUser,
} from "../../GraphQLBody/Users";

describe("User Queries and Mutations", () => {
  const URL = "http://localhost:3001/graphql";

  it("Creates a new user", () => {
    cy.request({
      url: URL,
      method: "POST",
      body: {
        query: {
          addUser,
          variables: {
            name: "Test User",
            email: "test.user@getMaxListeners.com",
            password: "TestUser12345!",
          },
        },
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
