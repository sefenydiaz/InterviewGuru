describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Logs a pre-existing user in", () => {
    cy.getDataTest("login-form-header").should("contain.text", "Login");
  });
});
