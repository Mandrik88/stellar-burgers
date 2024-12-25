// import { profileOrderSlice } from './profileOrderSlice';
import { getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TProfileOrderState = {
  orders: TOrder[];
  //   total: number;
  //   totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: TProfileOrderState = {
  orders: [],
  //   total: 0,
  //   totalToday: 0,
  loading: false,
  error: null
};

export const getProfileOrders = createAsyncThunk(
  'profileOrder/getOrders',
  getOrdersApi
);

export const profileOrderSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    selectProfileOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { selectProfileOrders } = profileOrderSlice.selectors;
export default profileOrderSlice.reducer;
