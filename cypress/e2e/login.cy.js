describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Logs a pre-existing user in", () => {
    cy.getDataTest("login-form-header").should("contain.text", "Login");

    cy.getDataTest("email-input").within(() => {
      cy.get("label").should("have.text", "Email: ");
      cy.get("input").type("stjimmy400@gmail.com");
    });

    cy.getDataTest("password-input").within(() => {
      cy.get("label").should("have.text", "Password: ");
      cy.get("input").type("Serum54321!");
    });

    cy.getDataTest("login-button").should("have.text", "Login!");
    cy.getDataTest("login-button").click();
    cy.location("pathname").should("equal", "/home");
  });
});
