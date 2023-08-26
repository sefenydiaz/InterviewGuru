const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

describe("Job Interview flow", () => {
  it("Logs a user in and runs through the interview question flow", () => {
    // logs a user in
    cy.visit("/login");
    cy.getDataTest("email-input").within(() => {
      cy.get("input").type("stjimmy400@gmail.com");
    });

    cy.getDataTest("password-input").within(() => {
      cy.get("input").type("Serum54321!");
    });
    cy.getDataTest("login-button").click();

    // tests home page and continues to interview question form
    cy.location("pathname").should("equal", "/home");
    cy.getDataTest("welcome-header").should(
      "have.text",
      "Welcome to InterviewGuru! Click below to begin."
    );
    cy.getDataTest("begin-button").should("have.text", "Begin");
    cy.getDataTest("begin-button").click();

    // tests interview question form
    cy.location("pathname").should("equal", "/form");
    cy.getDataTest("industry-input").within(() => {
      cy.get("label").should("have.text", "Industry:*");
      cy.get("input").type("Software Quality Assurance");
    });

    cy.getDataTest("role-input").within(() => {
      cy.get("label").should("have.text", "Role:*");
      cy.get("input").type("QA Automation Engineer");
    });

    // tests the experience dropdown
    cy.getDataTest("experience-dropdown").within(() => {
      cy.get("label").should("have.text", "Years Experience:*");
      cy.get("select").within(() => {
        cy.get("option")
          .its(0)
          .should("contains.text", "Select Experience Level...");
        cy.get("[data-test^=experience-option]").should("have.length", 11);
      });
      cy.get("select").select(2);
    });

    // submits the form
    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.getDataTest("submit-button").click();
    cy.getDataTest("loading-spinner").should("be.visible");
    cy.wait(3000);

    cy.location("pathname").should("equal", "/questions");
  });
});
