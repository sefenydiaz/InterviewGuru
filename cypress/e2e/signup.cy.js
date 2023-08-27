describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });
  it("Signs up a new user", () => {
    // checks that Login header exists and implicitly confirms we are on the login page
    cy.getDataTest("signup-header").should("have.text", "Sign Up");

    // Types a name into the name field
    cy.getDataTest("name-input").within(() => {
      cy.get("label").should("have.text", "Name: ");
      cy.get("input").type("Jeff Goldblum");
    });

    // Types an email into the email field
    cy.getDataTest("email-input").within(() => {
      cy.get("label").should("have.text", "Email: ");
      cy.get("input").type("jeff.goldblum@gmail.com");
    });

    // Types a password into the password field
    cy.getDataTest("password-input").within(() => {
      cy.get("label").should("have.text", "Password: ");
      cy.get("input").type("goldbluming1234!");
    });

    // Signs up a new user
    cy.getDataTest("name-input").within(() => {
      cy.get("input").clear();
    });
    cy.getDataTest("email-input").within(() => {
      cy.get("input").type("jeff.goldblum@gmail.com");
    });

    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.intercept("POST", "http://localhost:3000/login", {
      fixture: "successful-signup.json",
    });
    cy.getDataTest("submit-button").click();
    cy.location("pathname").should("equal", "/home");
  });
});
