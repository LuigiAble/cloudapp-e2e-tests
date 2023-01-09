import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    HomePage.clickOnLogin();
    LoginPage.enterEmail(email);
    LoginPage.enterPassword(password);
    LoginPage.clickOnSubmit();
    cy.url().should("contain", "/dashboard");
  });

  cy.visit(Cypress.config("cloudapp_url") + "/dashboard");
  DashboardPage.closeModal(); // Close modal in case it is displayed
});

Cypress.Commands.add("signUp", (email, password) => {
  cy.task("getFingerprint").then((token) => {
    cy.request({
      method: "POST",
      url: Cypress.config("cloudapp_url") + "/api/v4/account",
      failOnStatusCode: false,
      body: {
        authenticity_token: token,
        email,
        password,
        commit: "Sign up",
      },
    })
      .then((res) => {
        expect(res.status === 200, "✅ PASSED ✅").to.eq(true);
      })
      .then(() => {
        cy.clearCookie("_session_id");
      });
  });
});
