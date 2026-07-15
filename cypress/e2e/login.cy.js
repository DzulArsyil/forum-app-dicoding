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
    // Pakai email dan password yang BARU KAMU REGISTER tadi!
    cy.get('input[type="email"]').type('dzul.tester100@gmail.com');
    cy.get('input[type="password"]').type('tester100');
    cy.get('button[type="submit"]').click();

    // Sesuaikan kata 'Logout' dengan tulisan di navigasi aplikasimu.
    // Misalnya kalau di kodemu tulisannya 'Keluar', ganti jadi 'Keluar'.
    cy.contains('button', 'Logout').should('be.visible');
  });
});
