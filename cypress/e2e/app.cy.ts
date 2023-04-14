describe('English Dictionary E2E tests', () => {
  beforeEach(() => {
    cy.visit('');
    cy.fixture('apiResponse').then((apiResponse) => (this.apiResponse = apiResponse));
  });

  it('should render correct number of word cards when search is perfomed', () => {
    const query = 'word';
    
    cy.intercept('GET', `${Cypress.env('API_URL')}/${query}`, { body: this.apiResponse });
    
    cy.get('[data-cy="search-input"]').type(query);
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="word-card"]').should('have.length', this.apiResponse.length);
  });
});