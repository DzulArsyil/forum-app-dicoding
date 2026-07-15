import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../utils/api';
import { asyncReceiveThreads, receiveThreads } from './threadsSlice';

/**
 * Skenario pengujian untuk asyncReceiveThreads thunk
 *
 * - asyncReceiveThreads thunk
 * 1. harus men-dispatch action dengan benar ketika data fetching sukses
 * 2. harus men-dispatch action dan memanggil alert ketika data fetching gagal
 */

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2022-09-22T10:06:55.588Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Ups, terjadi kesalahan');

describe('asyncReceiveThreads thunk', () => {
  beforeEach(() => {
    // backup fungsi asli api.getAllThreads
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    // kembalikan fungsi asli setelah tiap test selesai
    api.getAllThreads = api._getAllThreads;
    delete api._getAllThreads;
  });

  it('harus men-dispatch action dengan benar ketika data fetching sukses', async () => {
    // arrange
    // memalsukan api agar selalu berhasil (resolve)
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    
    // memalsukan fungsi dispatch
    const dispatch = jest.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreads(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus men-dispatch action dan memanggil alert ketika data fetching gagal', async () => {
    // arrange
    // memalsukan api agar selalu gagal (reject)
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    
    // memalsukan fungsi dispatch dan window.alert
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});