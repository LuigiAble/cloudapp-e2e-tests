/// <reference types="Cypress" />

import AlertsPage from "../pages/AlertsPage";
import SignUpPage from "../pages/SignUpPage";
import { randomEmail } from "../support/generate";

const ACCOUNT_CREATED_MESSAGE = "Account created successfully";
const EMAIL_TAKEN_MESSAGE = "Validation failed: Email has already been taken";

describe("Signup a new Account", () => {
  const email = randomEmail();
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.intercept({
      path: "/api/v4/account",
      method: "POST",
    }).as("account");
    cy.visit("/signup");
  });

  describe("Signup using valid values", () => {
    it("should update user avatar successfully", () => {
      SignUpPage.enterEmail(email);
      SignUpPage.enterPassword(password);
      SignUpPage.clickOnSubmit();

      // Validate account API returns 200
      cy.wait("@account").its("response.statusCode").should("eq", 200);

      SignUpPage.elements
        .sucessCreationAlert()
        .should("contain.text", ACCOUNT_CREATED_MESSAGE);

      // Validate elements are displayed correctly (sometimes it is not redirecting to /onboarding/downloads)
      cy.visit("/onboarding/downloads");

      SignUpPage.elements.successCreationTitle().should("be.visible");
      SignUpPage.elements
        .cloudAppImage()
        .should("be.visible")
        .and(($img) => {
          // "naturalWidth" and "naturalHeight" are set when the image loads
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  describe("Signup using invalid values", () => {
    it("should not create a new user an display an invalid message", () => {
      SignUpPage.enterEmail(email);
      SignUpPage.enterPassword(password);
      SignUpPage.clickOnSubmit();

      // Validate error message is displayed
      AlertsPage.elements
        .errorMessage()
        .should("contain.text", EMAIL_TAKEN_MESSAGE);
    });
  });
});
