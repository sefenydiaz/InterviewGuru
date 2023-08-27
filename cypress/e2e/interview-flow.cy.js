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
    cy.intercept({
      path: "http://localhost:3000/graphql",
    }).as("addAnswer");
    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.getDataTest("submit-button").click();
    cy.getDataTest("loading-spinner").should("be.visible");
    cy.wait("@addAnswer");

    // tests the question page
    cy.location("pathname").should("equal", "/questions");
    cy.getDataTest("question-header").should("have.text", "Question:");
    cy.getDataTest("question-data").should("be.visible");

    // types and submits an answer
    cy.getDataTest("answer-form").within(() => {
      cy.get("label").should("have.text", "Answer:");
      cy.get("input").type(
        "I was testing an app that makes an asynchronos API call on the backend of the stack. Due to an indefinite loading time based on the asychronous API, my test kept failing if the call was not completed by the time the next test ran. In order to avoid this, I used a wait() command and experimented with the approximate time it took for the response. After the test ran without failure and I was able to move on to testing other features."
      );
    });
    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.getDataTest("submit-button").click();

    // tests that feedback is provided after the answer is submitted
    cy.location("pathname").should("equal", "/feedback");
    cy.getDataTest("loading-spinner").should("be.visible");
    cy.wait(30000);
    cy.getDataTest("feedback-header").should("have.text", "Feedback:");
    cy.getDataTest("feedback-data").should("be.visible");
    cy.getDataTest("submit-button").should("have.text", "Exit to Home");
    cy.getDataTest("submit-button").within(() => {
      cy.get("a").click();
    });

    //   // tests the logout functionality
    //   cy.location("pathname").should("equal", "/home");
    //   cy.getDataTest("logout-button").should("have.text", "Logout");
    //   cy.getDataTest("logout-button").click();
    //   cy.location("pathname").should("equal", "/login");
  });
});
