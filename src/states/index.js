import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUserSlice';
import usersReducer from './usersSlice';
import threadsReducer from './threadsSlice';
import detailThreadReducer from './detailThreadSlice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
