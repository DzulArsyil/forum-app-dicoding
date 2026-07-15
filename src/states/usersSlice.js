import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../utils/api';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    receiveUsers: (state, action) => action.payload,
  },
});

export const { receiveUsers } = usersSlice.actions;

// Thunk untuk Register
export const asyncRegisterUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.register({ name, email, password });
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

// Thunk untuk mengambil semua data user
export const asyncReceiveUsers = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const users = await api.getAllUsers();
    dispatch(receiveUsers(users));
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default usersSlice.reducer;
