import { configureStore } from '@reduxjs/toolkit';
import { TFeedState } from './feedSlice';
import { getFeeds } from './feedSlice';
import feedReducer from './feedSlice';

// Определяем тип корневого состояния приложения
type RootState = {
  feed: TFeedState;
};

// Группа тестов для среза состояния корма
describe('feedSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  // Перед каждым тестом будет создано новое хранилище
  beforeEach(() => {
    store = configureStore({ reducer: { feed: feedReducer } }); // Настраиваем хранилище с редюсером корма
  });

  // Проверка, что начальное состояние соответствует ожидаемому
  test('should return the initial state', () => {
    const result = store.getState().feed;
    expect(result).toEqual(initialState);
  });

  // Тестируем обработку.pending при запросе кормов
  test('should handle getFeeds.pending', () => {
    store.dispatch(getFeeds.pending('testRequestId'));
    const result = store.getState().feed;
    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  // Тестируем обработку.fulfilled при успешном получении кормов
  test('should handle getFeeds.fulfilled', () => {
    const feedsResponse = {
      orders: [
        { id: 1, name: 'Order 1' },
        { id: 2, name: 'Order 2' }
      ],
      total: 2,
      totalToday: 1
    };

    const action = {
      type: getFeeds.fulfilled.type,
      payload: feedsResponse
    };

    const result = feedReducer(initialState, action); // Получаем новое состояние среза, применяя действие к начальному состоянию
    expect(result.orders).toEqual(feedsResponse.orders); // Проверяем, что заказы обновились
    expect(result.total).toBe(feedsResponse.total); // Проверяем, что общее количество заказов обновлено
    expect(result.totalToday).toBe(feedsResponse.totalToday); // Проверяем обновление количества заказов за сегодня
    expect(result.loading).toBe(false); // Проверяем, что флаг загрузки сброшен
    expect(result.error).toBe(null); // Убедимся, что ошибка отсутствует
  });

  // Тестируем обработку.rejected при ошибке получения кормов
  test('should handle getFeeds.rejected', () => {
    const errorMessage = 'Ошибка загрузки данных';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };

    const result = feedReducer(initialState, action); // Получаем новое состояние среза, применяя действие
    expect(result.loading).toBe(false); // Проверяем, что флаг загрузки сброшен
    expect(result.error).toBe(errorMessage); // Убедимся, что ошибка правильно установлена
  });
});
