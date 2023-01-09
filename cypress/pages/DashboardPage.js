class DashboardPage {
  elements = {
    welcomeMessage: () => cy.contains(".alert-message", "Welcome back!"),
    mainMenu: () => cy.get("#main-menu"),
    emailDropdownItem: (email) => cy.contains(".dropdown-item", email),
    signOutLink: () => cy.get("a[data-testid=dropdown-link-sign_out]"),
    settingsLink: () => cy.get("a[data-testid=dropdown-link-settings]"),
    sideBarSection: () => cy.get("[data-testid=dashboard-sidebar]"),
    modalHeader: () => cy.get(".modal-dialog-centered header"),
  };

  clickOnDashboardMenu() {
    this.elements.mainMenu().should("be.visible").click();
  }

  clickOnSignOut() {
    this.elements.signOutLink().should("be.visible").click();
  }

  clickOnSettings() {
    this.elements.settingsLink().should("be.visible").click();
  }

  clickOnCloseModal() {
    this.elements.closeIcon().should("be.visible").click();
  }

  // Close modal in case it is displayed
  closeModal() {
    cy.get("body").then(($body) => {
      if ($body.find(".modal-dialog-centered .modal-content").length) {
        this.elements.modalHeader().should("be.visible").type("{esc}");
      } else {
        assert.isOk("No modal displayed");
      }
    });
  }
}

module.exports = new DashboardPage();
