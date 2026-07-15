import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

/**
 * Skenario pengujian untuk komponen RegisterInput
 *
 * - RegisterInput component
 * 1. harus menangani pengetikan nama dengan benar
 * 2. harus menangani pengetikan email dengan benar
 * 3. harus menangani pengetikan password dengan benar
 * 4. harus memanggil fungsi register ketika tombol daftar ditekan
 */

describe('RegisterInput component', () => {
  it('harus menangani pengetikan nama dengan benar', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama');

    // action
    await userEvent.type(nameInput, 'John Doe');

    // assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('harus menangani pengetikan email dengan benar', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'test@example.com');

    // assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('harus menangani pengetikan password dengan benar', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('harus memanggil fungsi register ketika tombol daftar ditekan', async () => {
    // arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Nama');
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const registerButton = await screen.getByRole('button', { name: 'Daftar' });

    // action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});