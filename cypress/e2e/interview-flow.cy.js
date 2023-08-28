const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

describe("Job Interview flow", () => {
  it("Tests the interview flow", () => {
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
    cy.intercept("POST", "http://localhost:3000/graphql", {
      fixture: "addQuestion.json",
    }).as("addQuestion");
    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.getDataTest("submit-button").click();
    cy.wait("@addQuestion").then((intercept) => {
      expect(intercept.response.body.data.addQuestion.question).equal(
        "Describe a situation where you encountered a complex automation challenge and how you approached solving it."
      );

      // tests the question page
      cy.location("pathname").should("equal", "/questions");
      cy.getDataTest("question-header").should("have.text", "Question:");
      cy.getDataTest("question-data").should("be.visible");

      // types an answer
      cy.getDataTest("answer-form").within(() => {
        cy.get("label").should("have.text", "Answer:");
        cy.get("input").type(
          "I was testing an app that makes an asynchronos API call on the backend of the stack. Due to an indefinite loading time based on the asychronous API calmy test kept failing when the call was not completed by the time the next test ran. In order to avoid this, I used a wait() command and passed in argument that instructed the wait command to finish executing when the API response was intercepted. After the test ran without failure and I was able move on to testing other features."
        );
      });
    });

    // submits an answer
    cy.intercept("POST", "http://localhost:3000/graphql", {
      fixture: "addAnswer.json",
    }).as("addAnswer");
    cy.getDataTest("submit-button").should("have.text", "Submit");
    cy.getDataTest("submit-button").click();

    // tests that answer is correct after the answer is submitted

    cy.wait("@addAnswer").then((intercept) => {
      expect(intercept.response.body.data.addAnswer.answer).equal(
        "I was testing an app that makes an asynchronos API call on the backend of the stack. Due to an indefinite loading time based on the asychronous API call, my test kept failing when the call was not completed by the time the next test ran. In order to avoid this, I used a wait() command and passed in an argument that instructed the wait command to finish executing when the API response was intercepted. After the test ran without failure and I was able to move on to testing other features."
      );
    });

    cy.intercept("POST", "http://localhost:3000/graphql", {
      fixture: "getFeedback.json",
    }).as("getFeedback");
    cy.location("pathname").should("equal", "/feedback");
    cy.wait("@getFeedback").then((intercept) => {
      expect(intercept.response.body.data.getFeedback.feedback).equal(
        "I would rate this answer a 4 out of 5.\n\nSTAR Feedback:\nSituation: The candidate correctly identified a complex automation challenge related to an asynchronous API call and its impact on test failure.\nTask: The candidate used a wait() command with a specific argument to address the challenge and ensure that the test completed successfully.\nAction: The candidate executed the wait() command to intercept the API response and prevent test failures.\nResult: As a result of this approach, the candidate was able to complete the test without any failures and proceed to test other features.\n\nFeedback: The candidate gave a clear and concise response, explaining the problem, their solution, and the positive outcome. They demonstrated their ability to troubleshoot and solve a complex automation challenge effectively. To improve their answer, they could have provided more details about the specific wait() command used and explained any potential drawbacks or limitations of this approach."
      );
    });
    cy.getDataTest("feedback-header").should("have.text", "Feedback:");
    cy.getDataTest("feedback-data").should("be.visible");
    cy.getDataTest("submit-button").should("have.text", "Exit to Home");
    cy.getDataTest("submit-button").within(() => {
      cy.get("a").click();
    });

    // tests the logout functionality
    cy.location("pathname").should("equal", "/home");
    cy.getDataTest("logout-button").should("have.text", "Logout");
    cy.getDataTest("logout-button").click();
    cy.location("pathname").should("equal", "/login");
  });
});
