import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

// Описание набора тестов
describe('ingredientSlice', () => {
  // Блок тестов для обработки действий, связанных с получением ингредиентов
  describe('getIngredients', () => {
    // Определение различных состояний действий для получения ингредиентов
    const actions = {
      pending: {
        type: getIngredients.pending.type, // Действие, сигнализирующее о начале процесса получения ингредиентов
        payload: null // Нет полезной нагрузки на стадии ожидания
      },
      rejected: {
        type: getIngredients.rejected.type, // Действие, указывающее на ошибку в процессе получения ингредиентов
        error: { message: 'error' } // Сообщение об ошибке
      },
      fulfilled: {
        type: getIngredients.fulfilled.type, // Действие, указывающее на успешное получение ингредиентов
        payload: ['ingredient1', 'ingredient2'] // Полезная нагрузка со списком полученных ингредиентов
      }
    };

    // Тест на установку состояния загрузки в true, когда получение ингредиентов в процессе
    test('should set loading to true when getIngredients is pending', () => {
      const result = ingredientSlice(initialState, actions.pending); // Обновление состояния с использованием действия pending
      expect(result.loading).toBe(true); // Проверка, что статус загрузки установлен в true
      expect(result.error).toBeNull(); // В момент ожидания ошибок не должно быть
    });

    // Тест на обработку состояния ошибки, когда получение ингредиентов завершилось неудачей
    test('should handle error state when getIngredients is rejected', () => {
      const result = ingredientSlice(initialState, actions.rejected); // Обновление состояния с использованием действия rejected
      expect(result.loading).toBe(false); // Проверка, что статус загрузки установлен в false
      expect(result.error).toBe(actions.rejected.error.message); // Убедиться, что сообщение об ошибке верное
      expect(result.ingredients).toEqual([]); // Убедиться, что ингредиенты остаются неизменными
    });

    // Тест на обновление состояния при успешном получении ингредиентов
    test('should update the state when getIngredients is fulfilled', () => {
      const result = ingredientSlice(initialState, actions.fulfilled); // Обновление состояния с использованием действия fulfilled
      expect(result.loading).toBe(false); // Проверка, что статус загрузки установлен в false
      expect(result.ingredients).toEqual(actions.fulfilled.payload); // Убедиться, что ингредиенты обновлены с полученными данными
      expect(result.error).toBeNull(); // Ошибки с получением не должно быть
    });
  });
});
