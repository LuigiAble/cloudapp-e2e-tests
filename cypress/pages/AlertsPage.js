class AlertsPage {
  elements = {
    successMessage: () => cy.get(".alert-success"),
    errorMessage: () => cy.get(".alert-danger"),
  };
}

module.exports = new AlertsPage();
