import authUserReducer, { setAuthUser, unsetAuthUser } from './authUserSlice';

/**
 * Skenario pengujian untuk authUserReducer
 *
 * - authUserReducer function
 * 1. harus mengembalikan state awal (null) saat diberikan action yang tidak diketahui
 * 2. harus mengembalikan data user saat diberikan action setAuthUser
 * 3. harus mengembalikan null saat diberikan action unsetAuthUser
 */

describe('authUserReducer', () => {
  it('harus mengembalikan state awal saat diberikan action yang tidak diketahui', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan data user saat diberikan action setAuthUser', () => {
    // arrange
    const initialState = null;
    const action = setAuthUser({
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
    });

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });

  it('harus mengembalikan null saat diberikan action unsetAuthUser', () => {
    // arrange
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = unsetAuthUser();

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});