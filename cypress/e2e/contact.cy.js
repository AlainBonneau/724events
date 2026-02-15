describe("Contact flow", () => {
  it("allows a user to send a contact message", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Contact").click();

    cy.get('[data-testid="contact-lastname"]').type("Bonneau");
    cy.get('[data-testid="contact-firstname"]').type("Alain");
    cy.get('[data-testid="contact-email"]').type("alain@example.com");
    cy.get('[data-testid="contact-message"]').type(
      "Hello, ceci est un test e2e."
    );

    cy.get('[data-testid="contact-submit"]').click();

    cy.contains("Message envoyé !").should("be.visible");
  });
});
