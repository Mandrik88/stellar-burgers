import authReducer, {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUser,
  getOrdersAll
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    loading: false,
    error: null,
    registerData: null,
    userData: null,
    isAuthenticated: false,
    userOrders: []
  };

  // Тест на возврат начального состояния при неизвестном действии
  test('should return initial state for unknown action', () => {
    const result = authReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  // Тест для обработки состояния регистрации (pending)
  test('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const result = authReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.isAuthenticated).toBe(false);
  });

  // Тест для успешной регистрации пользователя (fulfilled)
  test('should handle registerUser.fulfilled', () => {
    const userData = { id: 'user', email: 'lena@test.com' };
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: userData }
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      userData,
      isAuthenticated: true
    });
  });

  // Тест для обработки неудачной регистрации (rejected)
  test('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка',
      isAuthenticated: false
    });
  });

  // Тест для обработки состояния входа пользователя (pending)
  test('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type }; // Создание действия для состояния ожидания входа
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result.loading).toBe(true); // Проверка, что загрузка активна
    expect(result.error).toBeNull(); // Проверка, что ошибок нет
    expect(result.isAuthenticated).toBe(false); // Проверка, что пользователь не авторизован
  });

  // Тест для успешного входа пользователя (fulfilled)
  test('should handle loginUser.fulfilled', () => {
    const userData = { id: 'user', email: 'lena@test.com' }; // Данные пользователя при успешном входе
    const action = {
      type: loginUser.fulfilled.type, // Создание действия для успешного входа
      payload: { user: userData } // Полезная нагрузка с данными пользователя
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      userData, // Проверка, что данные пользователя сохранены
      isAuthenticated: true // Проверка, что пользователь теперь авторизован
    });
  });

  // Тест для обработки неудачного входа (rejected)
  test('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type, // Создание действия для неудачного входа
      error: { message: 'Ошибка' } // Сообщение об ошибке
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка', // Проверка, что ошибка сохранена в состоянии
      isAuthenticated: false // Проверка, что пользователь не авторизован
    });
  });

  // Тест для обработки состояния выхода пользователя (pending)
  test('should handle logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type }; // Создание действия для состояния ожидания выхода
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result.loading).toBe(true); // Проверка, что загрузка активна
    expect(result.error).toBeNull(); // Проверка, что ошибок нет
  });

  // Тест для успешного выхода пользователя (fulfilled)
  test('should handle logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type }; // Создание действия для успешного выхода
    const result = authReducer(
      {
        ...initialState,
        userData: { email: 'lena@test.com', name: '' }, // Данные текущего пользователя
        isAuthenticated: true // Указание, что пользователь авторизован
      },
      action
    );
    expect(result).toEqual({
      ...initialState,
      loading: false,
      userData: null, // Проверка, что данные пользователя сброшены
      isAuthenticated: false // Проверка, что пользователь теперь не авторизован
    });
  });

  // Тест для обработки неудачного выхода (rejected)
  test('should handle logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type, // Создание действия для неудачного выхода
      error: { message: 'Ошибка' } // Сообщение об ошибке
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка', // Проверка, что ошибка сохранена в состоянии
      isAuthenticated: true // Проверка, что пользователь все еще авторизован
    });
  });

  // Тест для обработки состояния обновления пользователя (pending)
  test('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type }; // Создание действия для состояния ожидания обновления
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result.loading).toBe(true); // Проверка, что загрузка активна
    expect(result.error).toBeNull(); // Проверка, что ошибок нет
  });

  // Тест для успешного обновления данных пользователя (fulfilled)
  test('should handle updateUser.fulfilled', () => {
    const userData = { id: 'user', email: 'lenaupdated@test.com' }; // Обновленные данные пользователя
    const action = {
      type: updateUser.fulfilled.type, // Создание действия для успешного обновления
      payload: { user: userData } // Полезная нагрузка с обновленными данными пользователя
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      userData // Проверка, что обновленные данные пользователя сохранены
    });
  });

  // Тест для обработки неудачного обновления (rejected)
  test('should handle updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type, // Создание действия для неудачного обновления
      error: { message: 'Ошибка' } // Сообщение об ошибке
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка' // Проверка, что ошибка сохранена в состоянии
    });
  });

  // Тест для обработки состояния получения данных пользователя (pending)
  test('should handle getUser.pending', () => {
    const action = { type: getUser.pending.type }; // Создание действия для состояния ожидания получения данных
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result.loading).toBe(true); // Проверка, что загрузка активна
    expect(result.error).toBeNull(); // Проверка, что ошибок нет
  });

  // Тест для успешного получения данных пользователя (fulfilled)
  test('should handle getUser.fulfilled', () => {
    const userData = { id: 'user', email: 'lena@test.com' }; // Данные пользователя при успешном получении
    const action = {
      type: getUser.fulfilled.type, // Создание действия для успешного получения
      payload: { user: userData } // Полезная нагрузка с данными пользователя
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      userData, // Проверка, что данные пользователя сохранены
      isAuthenticated: true // Проверка, что пользователь теперь авторизован
    });
  });

  // Тест для обработки неудачного получения данных (rejected)
  test('should handle getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type, // Создание действия для неудачного получения
      error: { message: 'Ошибка' } // Сообщение об ошибке
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка', // Проверка, что ошибка сохранена в состоянии
      isAuthenticated: false // Проверка, что пользователь не авторизован
    });
  });

  // Тест для обработки состояния получения всех заказов пользователя (pending)
  test('should handle getOrdersAll.pending', () => {
    const action = { type: getOrdersAll.pending.type }; // Создание действия для состояния ожидания получения заказов
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result.loading).toBe(true); // Проверка, что загрузка активна
    expect(result.error).toBeNull(); // Проверка, что ошибок нет
  });

  // Тест для успешного получения всех заказов пользователя (fulfilled)
  test('should handle getOrdersAll.fulfilled', () => {
    const orders = [{ id: 'order1' }, { id: 'order2' }]; // Данные заказов при успешном получении
    const action = {
      type: getOrdersAll.fulfilled.type, // Создание действия для успешного получения заказов
      payload: orders // Полезная нагрузка с данными заказов
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      userOrders: orders // Проверка, что заказы сохранены в состоянии
    });
  });

  // Тест для обработки неудачного получения заказов (rejected)
  test('should handle getOrdersAll.rejected', () => {
    const action = {
      type: getOrdersAll.rejected.type, // Создание действия для неудачного получения заказов
      error: { message: 'Ошибка' } // Сообщение об ошибке
    };
    const result = authReducer(initialState, action); // Обновление состояния
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка' // Проверка, что ошибка сохранена в состоянии
    });
  });
});
