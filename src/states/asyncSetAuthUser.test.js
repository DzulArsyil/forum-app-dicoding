/* eslint-disable no-underscore-dangle */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../utils/api';
import { asyncSetAuthUser, setAuthUser } from './authUserSlice';

/**
 * Skenario pengujian untuk asyncSetAuthUser thunk
 *
 * - asyncSetAuthUser thunk
 * 1. harus men-dispatch action dan menyimpan token dengan benar ketika login sukses
 * 2. harus men-dispatch action dan memanggil alert ketika login gagal
 */

const fakeTokenResponse = 'fake_token_12345';
const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image.com/avatar',
};

const fakeErrorResponse = new Error('Email atau password salah');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // backup fungsi asli API
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // kembalikan fungsi asli API setelah test selesai
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('harus men-dispatch action dan menyimpan token dengan benar ketika login sukses', async () => {
    // arrange
    // memalsukan api agar selalu berhasil
    api.login = () => Promise.resolve(fakeTokenResponse);
    api.putAccessToken = jest.fn(); // memantau pemanggilan fungsi simpan token
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // memalsukan fungsi dispatch
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password123' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeTokenResponse);
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus men-dispatch action dan memanggil alert ketika login gagal', async () => {
    // arrange
    // memalsukan api agar selalu gagal
    api.login = () => Promise.reject(fakeErrorResponse);

    // memalsukan fungsi dispatch dan window.alert
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password_salah' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
