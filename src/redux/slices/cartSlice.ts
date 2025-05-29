import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Item already exists, increase quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }
      
      // Update totals
      state.totalQuantity += 1;
      state.totalAmount = calculateTotalAmount(state.items);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        state.totalQuantity -= item.quantity;
        state.items.splice(existingItemIndex, 1);
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        
        if (item.quantity === 1) {
          // Remove item if quantity will be 0
          state.items.splice(existingItemIndex, 1);
        } else {
          state.items[existingItemIndex].quantity -= 1;
        }
        
        state.totalQuantity -= 1;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Helper function to calculate total amount
const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer; 