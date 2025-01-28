import { profileOrderSlice } from './profileOrderSlice';
import { getProfileOrders } from './profileOrderSlice';

const { reducer } = profileOrderSlice;

describe('profileOrderSlice', () => {
  // Проверка начального состояния редюсера
  test('should return the initial state when the state is undefined', () => {
    const initialState = reducer(undefined, { type: '' });
    expect(initialState).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });

  // Проверка состояния pending
  test('should handle pending state', () => {
    const testRequestId = 'test-request-id';
    const pendingState = reducer(
      undefined,
      getProfileOrders.pending(testRequestId)
    );
    expect(pendingState).toEqual({
      orders: [],
      loading: true,
      error: null
    });
  });

  // Проверка состояния fulfilled
  test('should handle fulfilled state', () => {
    const testRequestId = 'test-request-id';
    const fulfilledState = reducer(
      undefined,
      getProfileOrders.fulfilled(
        [
          {
            _id: '1',
            status: 'done',
            name: 'Order 1',
            createdAt: '',
            updatedAt: '',
            number: 1,
            ingredients: ['ingr1', 'ingr2']
          },
          {
            _id: '2',
            status: 'pending',
            name: 'Order 2',
            createdAt: '',
            updatedAt: '',
            number: 2,
            ingredients: ['ingr3', 'ingr4']
          }
        ],
        testRequestId
      )
    );
    expect(fulfilledState).toEqual({
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Order 1',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: ['ingr1', 'ingr2']
        },
        {
          _id: '2',
          status: 'pending',
          name: 'Order 2',
          createdAt: '',
          updatedAt: '',
          number: 2,
          ingredients: ['ingr3', 'ingr4']
        }
      ],
      loading: false,
      error: null
    });
  });

  // Проверка состояния rejected
  test('should handle rejected state', () => {
    const testRequestId = 'test-request-id';
    const testErrorMessage = 'Failed to fetch orders';
    const rejectedState = reducer(
      undefined,
      getProfileOrders.rejected(new Error(testErrorMessage), testRequestId)
    );
    expect(rejectedState).toEqual({
      orders: [],
      loading: false,
      error: testErrorMessage
    });
  });
});
