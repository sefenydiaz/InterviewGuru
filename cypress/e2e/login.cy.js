describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Attempts login with correct email and incorrect password", () => {
    // checks that Login header exists and implicitly confirms we are on the login page
    cy.getDataTest("login-form-header").should("contain.text", "Login");

    // Correct email incorrect password scenario
    cy.getDataTest("email-input").within(() => {
      cy.get("label").should("have.text", "Email: ");
      cy.get("input").type("stjimmy400@gmail.com");
    });

    cy.getDataTest("password-input").within(() => {
      cy.get("label").should("have.text", "Password: ");
      cy.get("input").type("qswdfjwnef");
    });

    cy.getDataTest("login-button").click();
    cy.location("pathname").should("equal", "/login");
  });

  it("Attempts login with correct email and incorrect password", () => {
    // Incorrect email correct password scenario
    cy.getDataTest("email-input").within(() => {
      cy.get("input").type("jimmy400@gmail.com");
    });

    cy.getDataTest("password-input").within(() => {
      cy.get("input").type("Serum54321!");
    });

    cy.getDataTest("login-button").click();
    cy.location("pathname").should("equal", "/login");
  });

  it("Logs a pre-existing user in and logs the user out", () => {
    // Correct email/password scenario
    cy.getDataTest("email-input").within(() => {
      cy.get("input").type("stjimmy400@gmail.com");
    });

    cy.getDataTest("password-input").within(() => {
      cy.get("input").type("Serum54321!");
    });

    cy.getDataTest("login-button").should("have.text", "Login!");
    cy.intercept("POST", "http://localhost:3000/login", {
      fixture: "successful-login.json",
    });
    cy.getDataTest("login-button").click();
    cy.location("pathname").should("equal", "/home");

    // logout test
    cy.getDataTest("logout-button").should("have.text", "Logout");
    cy.getDataTest("logout-button").click();
    cy.location("pathname").should("equal", "/login");
  });
});
