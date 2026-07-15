import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../utils/api';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
  },
});

export const { receiveThreads, addThread } = threadsSlice.actions;

export const asyncReceiveThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threads = await api.getAllThreads();
    dispatch(receiveThreads(threads));
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThread(thread));
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default threadsSlice.reducer;
