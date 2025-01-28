import { getOrderByNumber, orderSlice, initialState } from './orderSlice';

describe('orderSlice', () => {
  const { reducer } = orderSlice;

  // Проверка начального состояния редюсера
  test('should return the initial state when the state is undefined', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  // Тестирование состояния при ожидании запроса
  test('should handle pending state', () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = reducer(initialState, action);
    expect(result.request).toBe(true);
    expect(result.error).toBe(null);
  });

  // Тестирование состояния при успешном выполнении
  test('should handle fulfilled state', () => {
    const ordersResponse = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Order 1',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: ['ingr1', 'ingr2']
        }
      ]
    };

    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: ordersResponse
    };

    // Проверка редюсера на получение успешного ответа
    const result = reducer(initialState, action);
    expect(result.request).toBe(false);
    expect(result.error).toBe(null);
    expect(result.orderByNumberResponse).toEqual(ordersResponse.orders[0]);
    expect(result.orders).toContain(ordersResponse.orders[0]);
  });

  // Тестирование состояния при ошибке
  test('should handle rejected state', () => {
    const errorMessage = 'Error fetching order';

    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };

    const result = reducer(initialState, action);
    expect(result.request).toBe(false);
    expect(result.error).toBe(errorMessage);
  });
});
