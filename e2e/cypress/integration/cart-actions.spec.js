/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })

  it('Add items to cart then purchase items', () => {
    // cy.reload(true)
    // Add 2 items to cart
    cy.get('[data-cy=add-to-cart-6]').click();
    cy.get('[data-cy=add-to-cart-8]').click();

    // Check number of items in cart
    cy.get('[data-cy=badge-count]').should('have.text', '2');

    // Purchase items
    cy.get('[data-cy=badge-count]').click();
    cy.get('[data-cy=purchase-items]').click();

    // Check 2 recent purchased items 
    cy.get('[data-cy=recent-purchases]').click();
    cy.get('[data-cy="purchased-item-MAASDAM"]').should('include.text', 'MAASDAM');
    cy.get('[data-cy="purchased-item-SAINT ALBRAY"]').should('include.text', 'SAINT ALBRAY');
  })

})
