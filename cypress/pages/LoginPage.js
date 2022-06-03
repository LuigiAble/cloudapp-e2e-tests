class LoginPage {
  elements = {
    emailInput: () => cy.get("[data-testid=regular-login-email]"),
    passwordInput: () => cy.get("[data-testid=regular-login-password]"),
    loginButton: () => cy.get("[data-testid=regular-login-submit]"),
  };

  enterEmail(email) {
    this.elements.emailInput().should("be.visible").type(email);
  }

  enterPassword(password) {
    this.elements.passwordInput().should("be.visible").type(password);
  }

  clickOnSubmit() {
    this.elements.loginButton().should("be.visible").click();
  }
}

module.exports = new LoginPage();
