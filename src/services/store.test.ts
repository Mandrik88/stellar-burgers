import store, { RootState, rootReducer } from './store';
import { initialState as constructorInitialState } from '../services/slices/constructorSlice/constructorSlice';
import { initialState as orderInitialState } from '../services/slices/orderSlice/orderSlice';
import { initialState as feedInitialState } from '../services/slices/feedSlice/feedSlice';
import { initialState as userInitialState } from '../services/slices/userSlice/userSlice';
import { initialState as ingredientInitialState } from '../services/slices/ingredientSlice/ingredientSlice';
import { initialState as profileOrderInitialState } from '../services/slices/profileOrderSlice/profileOrderSlice';

describe('Redux Store Configuration', () => {
  it('should return the initial state for unknown actions', () => {
    const initialRootState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    // Проверяем, что rootReducer возвращает корректное начальное состояние
    expect(initialRootState.constructorBurger).toEqual(constructorInitialState);
    expect(initialRootState.order).toEqual(orderInitialState);
    expect(initialRootState.feed).toEqual(feedInitialState);
    expect(initialRootState.user).toEqual(userInitialState);
    expect(initialRootState.ingredient).toEqual(ingredientInitialState);
    expect(initialRootState.profileOrders).toEqual(profileOrderInitialState);
  });
});
