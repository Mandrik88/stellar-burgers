import { TOrder } from '@utils-types';
import constructorSlice, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient,
  setRequest,
  resetModal
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

// набор тестов для slice конструктора
describe('constructorSlice', () => {
  // Начальное состояние с пустыми параметрами конструктора
  const initialTestState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    loading: false,
    orderRequest: false,
    orderModalData: {
      _id: '',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    } as TOrder,
    error: null
  };

  // Тесты для добавления ингредиентов
  describe('addIngredient', () => {
    // Тест на добавление ингредиента в массив ingredients
    test('add ingredient to array ingredients', () => {
      const toAddIngredient = {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
      };

      // Добавление ингредиента в состояние
      const newState = constructorSlice(
        initialTestState,
        addIngredient(toAddIngredient)
      );

      // Проверка, что новый ингредиент добавлен в массив ingredients
      expect(newState.constructorItems.ingredients).toContainEqual({
        ...toAddIngredient,
        id: expect.any(String)
      });
    });

    // Тест на добавление булки
    test('add bun', () => {
      const toAddBun = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      };

      // Добавление булки в состояние
      const newState = constructorSlice(
        initialTestState,
        addIngredient(toAddBun)
      );

      // Проверка, что булка добавлена в состояние
      expect(newState.constructorItems.bun).toEqual({
        ...toAddBun,
        id: expect.any(String) // Проверка, что id сгенерирован и является строкой
      });
    });

    // Тест на замену ранее добавленной булки
    test('replacement of the previously added bun', () => {
      const initialStateWithBun = {
        ...initialTestState,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: 'Bun'
          },
          ingredients: []
        }
      };

      // Новая булка для замены
      const actualBun = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      };

      // Добавление новой булки и ожидание замены
      const newState = constructorSlice(
        initialStateWithBun,
        addIngredient(actualBun)
      );

      // Проверка, что булка была заменена
      expect(newState.constructorItems.bun).toEqual({
        ...actualBun,
        id: expect.any(String) // Проверка, что id сгенерирован и является строкой
      });
    });
  });

  // Тесты для удаления ингредиентов
  describe('removeIngredient', () => {
    const stateWithIngredient = {
      ...initialTestState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'sauce5',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          }
        ]
      }
    };

    // Тест на удаление ингредиента из конструктора
    test('remove ingredient from constructor', () => {
      const newState = constructorSlice(
        stateWithIngredient,
        removeIngredient('sauce5') // Удаление ингредиента с id 'sauce5'
      );

      // Проверка, что массив ингредиентов теперь пуст
      expect(newState.constructorItems.ingredients).toEqual([]);
    });
  });

  // Тесты для перемещения ингредиентов
  describe('moving ingredients', () => {
    const stateWithIngredients = {
      ...initialTestState,
      constructorItems: {
        bun: {
          id: 'bun1',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'sauce5',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'main11',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          },
          {
            id: 'main12',
            _id: '643d69a5c3f7b9001cfa0947',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
          }
        ]
      }
    };

    // Тест на перемещение ингредиента вверх
    test('moving the ingredient up', () => {
      const newState = constructorSlice(
        stateWithIngredients,
        moveIngredientUp(2) // Перемещение ингредиента с индексом 2 вверх
      );

      // Ожидаемый порядок ингредиентов после перемещения
      const expectedOrder = [
        stateWithIngredients.constructorItems.ingredients[0],
        stateWithIngredients.constructorItems.ingredients[2],
        stateWithIngredients.constructorItems.ingredients[1]
      ];

      // Проверка, что порядок ингредиентов соответствует ожидаемому
      expect(newState.constructorItems.ingredients).toEqual(expectedOrder);
    });

    // Тест на перемещение ингредиента вниз
    test('moving the ingredient down', () => {
      const newState = constructorSlice(
        stateWithIngredients,
        moveIngredientDown(1) // Перемещение ингредиента с индексом 1 вниз
      );

      // Ожидаемый порядок ингредиентов после перемещения
      const expectedOrder = [
        stateWithIngredients.constructorItems.ingredients[0],
        stateWithIngredients.constructorItems.ingredients[2],
        stateWithIngredients.constructorItems.ingredients[1]
      ];

      // Проверка, что порядок ингредиентов соответствует ожидаемому
      expect(newState.constructorItems.ingredients).toEqual(expectedOrder);
    });
  });

  // Тесты для заказа бургера
  describe('orderBurger', () => {
    const actions = {
      pending: { type: orderBurger.pending.type, payload: null }, // Действие при ожидании заказа
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'error' } // Ошибка при отказе
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 404 } } // Успешный заказ с номером 404
      }
    };

    // Тест на состояние заказа при ожидании
    test('pending', () => {
      const state = constructorSlice(initialTestState, actions.pending);
      expect(state.loading).toBe(true); // Проверка, что состояние загрузки действительно
      expect(state.error).toBeNull(); // Проверка, что ошибки нет
    });

    // Тест на состояние заказа при отказе
    test('rejected', () => {
      const state = constructorSlice(initialTestState, actions.rejected);
      expect(state.loading).toBe(false); // Проверка, что состояние загрузки завершено
      expect(state.error).toBe('error'); // Проверка, что ошибка установлена
    });

    // Тест на состояние заказа при успешном выполнении
    test('fulfilled', () => {
      const state = constructorSlice(initialTestState, actions.fulfilled);
      expect(state.loading).toBe(false); // Проверка, что состояние загрузки завершено
      expect(state.orderModalData?.number).toBe(404); // Проверка, что номер заказа сохранен
      expect(state.error).toBeNull(); // Проверка, что ошибки нет
    });
  });

  // Тесты для setRequest
  describe('setRequest', () => {
    test('sets order request state', () => {
      const orderData = true;
      const newState = constructorSlice(
        initialTestState,
        setRequest(orderData)
      ); // Установка orderRequest в true
      expect(newState.orderRequest).toBe(orderData); // Проверка, что состояние изменено на true
    });
  });

  // Тесты для resetModal
  describe('resetModal', () => {
    test('resets order modal data to null', () => {
      const stateWithModalData = {
        ...initialTestState,
        orderModalData: {
          _id: '',
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: []
        } // Предустановка данных модального окна
      };
      const newState = constructorSlice(stateWithModalData, resetModal()); // Сброс данных модального окна
      expect(newState.orderModalData).toBeNull(); // Проверка, что данные сброшены
    });
  });
});
