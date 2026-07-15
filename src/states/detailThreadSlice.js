import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../utils/api';

const detailThreadSlice = createSlice({
  name: 'detailThread',
  initialState: null,
  reducers: {
    receiveDetailThread: (state, action) => action.payload,
    clearDetailThread: () => null,
    addComment: (state, action) => {
      // Menambahkan komentar baru ke urutan paling atas
      state.comments = [action.payload, ...state.comments];
    },
  },
});

export const { receiveDetailThread, clearDetailThread, addComment } = detailThreadSlice.actions;

export const asyncReceiveDetailThread = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearDetailThread());
  try {
    const detailThread = await api.getDetailThread(threadId);
    dispatch(receiveDetailThread(detailThread));
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const comment = await api.createComment({ threadId, content });
    dispatch(addComment(comment));
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default detailThreadSlice.reducer;
