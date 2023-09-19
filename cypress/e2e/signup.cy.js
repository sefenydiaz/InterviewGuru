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
  });
});
