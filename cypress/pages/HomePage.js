class HomePage {
  elements = {
    loginLink: () => cy.contains(".top-level-link", "Log in"),
    signUpLink: () => cy.contains("a[role=button]", "Sign Up Free"),
  };

  clickOnLogin() {
    cy.visit("/");
    this.elements.loginLink().should("be.visible").click();
  }

  clickOnSignUp() {
    cy.visit("/");
    this.elements.signUpLink().should("be.visible").click();
  }
}

module.exports = new HomePage();
