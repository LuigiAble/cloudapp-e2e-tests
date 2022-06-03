class SettingsPage {
  elements = {
    uploadFile: () => cy.get('[name="user[avatar]"]'),
    submitChangesButton: () =>
      cy.get("[data-testid=onboarding-submit-about-you-form]"),
  };

  selectAvatar(file) {
    this.elements.uploadFile().should("be.visible").selectFile(file);
  }

  clickOnSubmit() {
    this.elements.submitChangesButton().should("be.visible").click();
  }
}

module.exports = new SettingsPage();
