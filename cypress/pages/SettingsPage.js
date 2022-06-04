class SettingsPage {
  elements = {
    profileLink: () => cy.get("[data-testid=profile-settings]"),
    profileHeading: () => cy.get("#profile h3"),
    uploadFile: () => cy.get('[name="user[avatar]"]'),
    submitChangesButton: () =>
      cy.get("[data-testid=onboarding-submit-about-you-form]"),
  };

  clickOnProfile() {
    this.elements.profileLink().should("be.visible").click();
  }

  selectAvatar(file) {
    this.elements.uploadFile().should("be.visible").selectFile(file);
  }

  clickOnSubmit() {
    this.elements.submitChangesButton().should("be.visible").click();
  }
}

module.exports = new SettingsPage();
