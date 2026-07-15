import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../utils/api';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => action.payload,
    unsetAuthUser: () => null,
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

// Thunk untuk Login
export const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

// Thunk untuk Logout
export const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(unsetAuthUser());
  api.putAccessToken('');
};

// Thunk untuk mengecek apakah user sudah login sebelumnya (Preload)
export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch (error) {
    dispatch(setAuthUser(null));
    api.putAccessToken('');
  } finally {
    dispatch(hideLoading());
  }
};

export default authUserSlice.reducer;
