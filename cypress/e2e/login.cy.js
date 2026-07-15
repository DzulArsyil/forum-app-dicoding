describe('Login Feature', () => {
  beforeEach(() => {
    // KITA ARAHKAN ROBOT LANGSUNG KE HALAMAN LOGIN
    cy.visit('http://localhost:3002/login'); 
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('harus bisa mengetik email dan password, lalu klik login', () => {
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  });
});