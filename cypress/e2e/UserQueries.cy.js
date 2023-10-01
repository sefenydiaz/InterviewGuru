import {
  addUser,
  login,
  allUsers,
  findUserById,
  deleteUser,
} from "../GraphQLBody/Users";

describe("User Queries and Mutations", () => {
  const URL = "http://localhost:3001/graphql";

  it.skip("Creates a new user", () => {
    cy.request({
      url: URL,
      method: "POST",
      body: {
        query: addUser,
      },
    }).then((res) => {
      console.log(res.body);
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("addUser");

      const { token, user } = res.body.data.addUser;

      expect(token).to.be.a("string");
      expect(user).to.be.an("object");
      expect(user).to.have.property("name", "Test User");
      expect(user).to.have.property("email", "test.user@gmail.com");
    });
  });

  it("Gets all the users in the DB", () => {
    cy.request({
      url: URL,
      method: "POST",
      body: {
        query: allUsers,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("object");
      expect(res.body.data.allUsers).to.be.an("array");
      expect(res.body.data.allUsers.length).to.eq(3);
    });
  });
});
