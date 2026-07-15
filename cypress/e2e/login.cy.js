describe('Login Feature', () => {
  beforeEach(() => {
    // 1. Intersep (potong) request API Login dan palsukan hasilnya
    cy.intercept('POST', '**/login', {
      status: 'success',
      message: 'ok',
      data: {
        token: 'mock-token-12345',
      },
    }).as('loginRequest');

    // 2. Intersep request profil pengguna dan palsukan profilnya
    cy.intercept('GET', '**/users/me', {
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: 'user-mock',
          name: 'Robot Tester',
          email: 'robot@gmail.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    }).as('getProfileRequest');

    cy.visit('http://localhost:3000/login');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('harus menampilkan pesan error ketika email/password salah', () => {
    // Kita paksa API mengembalikan error khusus untuk skenario ini
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    });

    cy.get('input[type="email"]').type('salah@gmail.com');
    cy.get('input[type="password"]').type('salahpass');
    cy.get('button[type="submit"]').click();

    // Sesuaikan dengan cara aplikasimu menampilkan error (alert/HTML)
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email or password is wrong');
    });
  });

  it('harus berhasil login dan mengarahkan ke halaman utama', () => {
    // Ketik sembarang karena API-nya sudah kita bajak di atas
    cy.get('input[type="email"]').type('bebas@gmail.com');
    cy.get('input[type="password"]').type('bebas123');
    cy.get('button[type="submit"]').click();

    // Tunggu sampai intersep API selesai dijalankan
    cy.wait('@loginRequest');
    cy.wait('@getProfileRequest');

    // Pastikan tombol Logout muncul di halaman utama
    cy.contains('button', 'Logout').should('be.visible');
  });
});
