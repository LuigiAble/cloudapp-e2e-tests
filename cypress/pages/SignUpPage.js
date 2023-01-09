class SignUpPage {
  elements = {
    emailInput: () => cy.get('input[name="email"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    submitButton: () => cy.get("[data-testid=regular-signup-submit]"),
    sucessCreationAlert: () => cy.get("#b-toaster-top-center"),
    successCreationTitle: () => cy.get(".download-cta-title"),
    cloudAppImage: () => cy.get('img[alt="CloudApp"]'),
  };

  enterEmail(email) {
    this.elements.emailInput().should("be.visible").type(email);
  }

  enterPassword(password) {
    this.elements.passwordInput().should("be.visible").type(password);
  }

  clickOnSubmit() {
    this.elements.submitButton().should("be.visible").click();
  }
}

module.exports = new SignUpPage();
