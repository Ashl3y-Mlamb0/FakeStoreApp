import { RootState } from '../store';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount; 