import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

/**
 * Skenario pengujian untuk komponen LoginInput
 *
 * - LoginInput component
 * 1. harus menangani pengetikan email dengan benar
 * 2. harus menangani pengetikan password dengan benar
 * 3. harus memanggil fungsi login ketika tombol login ditekan
 */

describe('LoginInput component', () => {
  it('harus menangani pengetikan email dengan benar', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'test@example.com');

    // assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('harus menangani pengetikan password dengan benar', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('harus memanggil fungsi login ketika tombol login ditekan', async () => {
    // arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});