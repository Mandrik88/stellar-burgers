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
    const state = store.getState().feed;
    expect(state).toEqual(initialState);
  });

  // Тестируем обработку.pending при запросе кормов
  test('should handle getFeeds.pending', () => {
    store.dispatch(getFeeds.pending('testRequestId'));
    const state = store.getState().feed;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
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

    const state = feedReducer(initialState, action); // Получаем новое состояние среза, применяя действие к начальному состоянию
    expect(state.orders).toEqual(feedsResponse.orders); // Проверяем, что заказы обновились
    expect(state.total).toBe(feedsResponse.total); // Проверяем, что общее количество заказов обновлено
    expect(state.totalToday).toBe(feedsResponse.totalToday); // Проверяем обновление количества заказов за сегодня
    expect(state.loading).toBe(false); // Проверяем, что флаг загрузки сброшен
    expect(state.error).toBe(null); // Убедимся, что ошибка отсутствует
  });

  // Тестируем обработку.rejected при ошибке получения кормов
  test('should handle getFeeds.rejected', () => {
    const errorMessage = 'Ошибка загрузки данных';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };

    const state = feedReducer(initialState, action); // Получаем новое состояние среза, применяя действие
    expect(state.loading).toBe(false); // Проверяем, что флаг загрузки сброшен
    expect(state.error).toBe(errorMessage); // Убедимся, что ошибка правильно установлена
  });
});
