import threadsReducer, { receiveThreads, addThread } from './threadsSlice';

/**
 * Skenario pengujian untuk threadsReducer
 *
 * - threadsReducer function
 * 1. harus mengembalikan state awal saat diberikan action yang tidak diketahui
 * 2. harus mengembalikan state berisi daftar thread saat diberikan action receiveThreads
 * 3. harus mengembalikan state dengan tambahan thread baru di awal saat diberikan action addThread
 */

describe('threadsReducer', () => {
  it('harus mengembalikan state awal saat diberikan action yang tidak diketahui', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan state berisi daftar thread saat diberikan action receiveThreads', () => {
    // arrange
    const initialState = [];
    const action = receiveThreads([
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
    ]);

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });

  it('harus mengembalikan state dengan tambahan thread baru di awal saat diberikan action addThread', () => {
    // arrange
    const initialState = [
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
    
    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
      createdAt: '2022-09-23T10:06:55.588Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    
    const action = addThread(newThread);

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });
});