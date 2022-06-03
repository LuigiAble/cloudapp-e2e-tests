/// <reference types="Cypress" />

import AlertsPage from "../pages/AlertsPage";
import DasboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import { randomEmail } from "../support/generate";

const LOGGED_OUT_MESSAGE = "Successfully Logged Out";
const ERROR_LOGGING_MESSAGE = "Invalid email / password combination";

describe("Navigate to CloudApp Login Page", () => {
  const email = randomEmail();
  const password = Cypress.env("password");

  before(() => {
    cy.intercept({
      path: "/api/v5/users",
      method: "GET",
    }).as("users");

    cy.signUp(email, password);
  });

  describe("Login using valid credentials", () => {
    it("should log in successfully", () => {
      cy.visit("/login");
      LoginPage.enterEmail(email);
      LoginPage.enterPassword(password);
      LoginPage.clickOnSubmit();

      // Wait until users API returns 200 to make sure is fully logged in
      cy.wait("@users").its("response.statusCode").should("eq", 200);

      // Validate elements are displayed
      DasboardPage.elements.welcomeMessage().should("be.visible");
      DasboardPage.elements.subHeadingMessage().should("be.visible");
      DasboardPage.elements.sideBarSection().should("be.visible");
      cy.url().should("contain", "/dashboard");
    });
  });

  describe("Login using invalid credentials", () => {
    it("should display an error message", () => {
      cy.visit("/login");
      LoginPage.enterEmail(`invalid_${email}`);
      LoginPage.enterPassword("invalid_password");
      LoginPage.clickOnSubmit();

      // Validate error message is displayed
      AlertsPage.elements
        .errorMessage()
        .should("contain.text", ERROR_LOGGING_MESSAGE);
      cy.url().should("contain", "/login");
    });
  });

  describe("Log out from Dashboard Page", () => {
    it("should log out successfully", () => {
      cy.login(email, password);
      DasboardPage.clickOnDashboardMenu();
      DasboardPage.clickOnSignOut();

      // Validate success message is displayed
      AlertsPage.elements
        .successMessage()
        .should("contain.text", LOGGED_OUT_MESSAGE);
      cy.url().should("contain", "/login");
    });
  });
});
