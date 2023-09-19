describe("Sign Up flow", () => {
  it("Tests the sign up feature", () => {
    // Verifies page location
    cy.visit("/signup");
    cy.location("pathname").should("eq", "/signup");
    cy.getDataTest("signup-header").should("have.text", "Sign Up");

    // Tests the name input field
    cy.getDataTest("name-input").within(() => {
      cy.get("label").should("have.text", "Name: ");
      cy.get("input").type("Bob ");
      cy.get("p").should(
        "have.text",
        "*This is a required field. Please enter first and last name."
      );
      cy.get("input").type("Saget");
      cy.get("p").should("have.text", "");
    });

    // Tests the email input field
    cy.getDataTest("email-input").within(() => {
      cy.get("label").should("have.text", "Email: ");
      cy.get("input").type("bob.saget");
      cy.get("p").should(
        "have.text",
        "*This is a required field. Please enter a vaild email."
      );
      cy.get("input").type("@gmail.com");
      cy.get("p").should("have.text", "");
    });

    // Tests the password input field
    cy.getDataTest("password-input").within(() => {
      cy.get("label").should("have.text", "Password: ");
      cy.get("input").type("Bobsaget");
      cy.get("p").should(
        "have.text",
        "*This is a required field. Please meet the following password requirements: A minimum of 8 characters. At least one uppercase letter. At least one lower case letter. At least one numerical character. At least one special character."
      );
      cy.get("input").type("12345!");
      //   cy.get("p").should("have.text", "");
    });

    // Submit button
    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.getDataTest("submit-button").click();
    cy.location("pathname").should("eq", "/home");

    // Tests delete account functionality
    cy.getDataTest("profile-button").should("have.text", "Profile").click();
    cy.location("pathname").should("eq", "/stats");
    cy.getDataTest("delete-account-modal").should("not.exist");

    // Tests the functionality of the delete account button
    cy.getDataTest("modal-button")
      .should("have.text", "Delete Account")
      .click();
    cy.getDataTest("delete-account-modal").should("exist");

    // Tests functionality of the delete account modal
    cy.getDataTest("modal-header").should("have.text", "Delete Account");
    cy.getDataTest("modal-content").should(
      "have.text",
      "This is a permanent action. Are you sure you want to permanently delete your account?"
    );
    cy.getDataTest("close-button").click();
    cy.getDataTest("delete-account-modal").should("not.exist");
    cy.getDataTest("modal-button").click();
    cy.getDataTest("delete-account-modal").should("exist");
    cy.getDataTest("cancel-button").should("have.text", "Cancel").click();
    cy.getDataTest("delete-account-button")
      .should("have.text", "Delete Account")
      .click();
    cy.location("pathname").should("eq", "/login");
  });
});
