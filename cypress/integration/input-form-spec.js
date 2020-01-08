describe('Home page', () => {
  it('loads welcome text', () => {
    cy.visit('http://localhost:3000')

    cy.get('h1')

    cy.should('have.text', 'Cash Cow - Mooooo')

  })

  it('sees the price component', () => {
    cy.visit('http://localhost:3000')

    cy.get('.symbols')

    cy.should('contain', 'aapl')

  })
})
