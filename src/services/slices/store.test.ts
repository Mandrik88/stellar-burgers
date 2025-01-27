import store, { RootState } from '../../services/store'; // путь к файлу вашего store
import { initialState as constructorInitialState } from '../../services/slices/constructorSlice/constructorSlice';
import { initialState as orderInitialState } from '../../services/slices/orderSlice/orderSlice';
import { initialState as feedInitialState } from '../../services/slices/feedSlice/feedSlice';
import { initialState as userInitialState } from '../../services/slices/userSlice/userSlice';
import { initialState as ingredientInitialState } from '../../services/slices/ingredientSlice/ingredientSlice';
import { initialState as profileOrderInitialState } from '../../services/slices/profileOrderSlice/profileOrderSlice';

describe('Redux Store Configuration', () => {
  it('should configure the store correctly', () => {
    const state: RootState = store.getState();

    // Проверяем, что начальные состояния редюсеров соответствуют ожидаемым
    expect(state.constructorBurger).toEqual(constructorInitialState);
    expect(state.order).toEqual(orderInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.user).toEqual(userInitialState);
    expect(state.ingredient).toEqual(ingredientInitialState);
    expect(state.profileOrders).toEqual(profileOrderInitialState);
  });

  it('should have the correct types for the initial state', () => {
    const state: RootState = store.getState();

    // Проверяем, что состояние является объектом
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('constructorBurger');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('ingredient');
    expect(state).toHaveProperty('profileOrders');
  });
});
