describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('harus menampilkan pesan error ketika email/password salah', () => {
    // Skenario Gagal
    cy.get('input[type="email"]').type('email.salah@example.com');
    cy.get('input[type="password"]').type('passwordsalah');
    cy.get('button[type="submit"]').click();

    // Asumsi menggunakan window.alert untuk pesan error. 
    // Jika aplikasimu menggunakan elemen HTML untuk pesan error, ganti dengan:
    // cy.get('.pesan-error').should('be.visible');
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email or password is wrong');
    });
  });

  it('harus berhasil login dan mengarahkan ke halaman utama', () => {
    // Skenario Berhasil
    // PASTIKAN EMAIL DAN PASSWORD INI BENAR-BENAR ADA DI DATABASENYA!
    cy.get('input[type="email"]').type('testuser@example.com'); 
    cy.get('input[type="password"]').type('password123'); 
    cy.get('button[type="submit"]').click();

    // Memastikan dialihkan ke halaman utama dan mengecek elemen yang hanya ada jika login
    // Ganti kata 'Logout' sesuai dengan tulisan tombol keluar di aplikasimu
    cy.get('button').contains('Logout').should('be.visible'); 
  });
});