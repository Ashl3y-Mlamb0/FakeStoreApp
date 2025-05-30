import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  userId: string | null;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  userId: null,
};

// Helper to save cart automatically
const saveCartToStorage = async (userId: string, items: CartItem[]) => {
  try {
    await AsyncStorage.setItem(`fake-store-cart-${userId}`, JSON.stringify({ items }));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

// Async thunk to load user-specific cart
export const loadUserCart = createAsyncThunk(
  'cart/loadUserCart',
  async (userId: string) => {
    try {
      const cartData = await AsyncStorage.getItem(`fake-store-cart-${userId}`);
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        return { items: parsedCart.items || [], userId };
      }
      return { items: [], userId };
    } catch (error) {
      return { items: [], userId };
    }
  }
);

// Async thunk to save user-specific cart
export const saveUserCart = createAsyncThunk(
  'cart/saveUserCart',
  async ({ userId, items }: { userId: string; items: CartItem[] }) => {
    try {
      await AsyncStorage.setItem(`fake-store-cart-${userId}`, JSON.stringify({ items }));
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
);

// Async thunk to clear user cart on sign out
export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async () => {
    return null;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (!state.userId) return; // Don't allow cart operations without user

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
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      
      // Auto-save to storage
      saveCartToStorage(state.userId, state.items);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      if (!state.userId) return;

      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
        
        // Auto-save to storage
        saveCartToStorage(state.userId, state.items);
      }
    },
    
    increaseQuantity: (state, action: PayloadAction<number>) => {
      if (!state.userId) return;

      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
        
        // Auto-save to storage
        saveCartToStorage(state.userId, state.items);
      }
    },
    
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      if (!state.userId) return;

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
        
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
        
        // Auto-save to storage
        saveCartToStorage(state.userId, state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Auto-save to storage if user exists
      if (state.userId) {
        saveCartToStorage(state.userId, state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.userId = action.payload.userId;
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        state.userId = null;
      });
  },
});

// Helper functions
const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateTotalQuantity = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer; 