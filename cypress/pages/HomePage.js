class HomePage {
  elements = {
    loginLink: () => cy.get("#menu-1-e49f70d a"),
    signUpLink: () => cy.contains("a[role=button]", "Sign Up Free"),
  };

  clickOnLogin() {
    cy.visit("/");
    this.elements.loginLink().eq(2).click();
  }

  clickOnSignUp() {
    cy.visit("/");
    this.elements.signUpLink().should("be.visible").click();
  }
}

module.exports = new HomePage();
