/// <reference types="Cypress" />

import AlertsPage from "../pages/AlertsPage";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";
import { randomEmail } from "../support/generate";

const AVATAR_UPDATED_MESSAGE = "Account updated successfully";
const ERROR_UPLOADING_FILE_MESSAGE = "Avatar Max size is 500x500px";

describe("Go to Settings and update user Avatar", () => {
  const email = randomEmail();
  const password = Cypress.env("password");

  before(() => {
    cy.signUp(email, password);
  });

  beforeEach(() => {
    cy.intercept({
      url: Cypress.config("cloudapp_url") + "/accounts/*",
      method: "POST",
    }).as("uploadUserAvatar");
    cy.login(email, password);
  });

  describe("Update user avatar using an image with valid dimentions", () => {
    it("should update user avatar successfully", () => {
      // Go to Settings
      DashboardPage.clickOnDashboardMenu();
      DashboardPage.clickOnSettings();
      cy.url().should("contain", "/organizations");

      // Select User Profile
      SettingsPage.clickOnProfile();
      SettingsPage.elements
        .profileHeading()
        .should("have.text", "Your profile");

      // Update user avatar
      cy.fixture("pepesaur.png", { encoding: null }).as("pepeAvatar");
      SettingsPage.selectAvatar("@pepeAvatar");
      SettingsPage.clickOnSubmit();

      // Display successfull message
      cy.wait("@uploadUserAvatar").its("response.statusCode").should("eq", 302);
      AlertsPage.elements
        .successMessage()
        .should("contain.text", AVATAR_UPDATED_MESSAGE);
    });
  });

  describe("Update user avatar using an image with invalid dimentions", () => {
    it("should not update the avatar and return an statusCode 422", () => {
      // Go to Settings
      DashboardPage.clickOnDashboardMenu();
      DashboardPage.clickOnSettings();
      cy.url().should("contain", "/organizations");

      // Select User Profile
      SettingsPage.clickOnProfile();
      SettingsPage.elements
        .profileHeading()
        .should("have.text", "Your profile");

      // Update user avatar
      cy.fixture("pepe-rock.png", { encoding: null }).as("pepeRock");
      SettingsPage.selectAvatar("@pepeRock");
      SettingsPage.clickOnSubmit();

      // Display error message
      cy.wait("@uploadUserAvatar").its("response.statusCode").should("eq", 422);
      AlertsPage.elements
        .errorMessage()
        .should("contain.text", ERROR_UPLOADING_FILE_MESSAGE);
    });
  });
});
