import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from './cartSlice';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  status: 'new' | 'paid' | 'delivered';
  createdAt: number;
  updatedAt: number;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// Helper to save orders to storage
const saveOrdersToStorage = async (userId: string, orders: Order[]) => {
  try {
    await AsyncStorage.setItem(`fake-store-orders-${userId}`, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders:', error);
  }
};

// Async thunk to load user orders
export const loadUserOrders = createAsyncThunk(
  'orders/loadUserOrders',
  async (userId: string) => {
    try {
      const ordersData = await AsyncStorage.getItem(`fake-store-orders-${userId}`);
      if (ordersData) {
        const orders = JSON.parse(ordersData);
        return orders;
      }
      return [];
    } catch (error) {
      return [];
    }
  }
);

// Async thunk to create order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ userId, items, totalAmount, totalQuantity }: {
    userId: string;
    items: CartItem[];
    totalAmount: number;
    totalQuantity: number;
  }, { getState, dispatch }) => {
    try {
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newOrder: Order = {
        id: orderId,
        userId,
        items: [...items],
        totalAmount,
        totalQuantity,
        status: 'new',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Get current orders and add new one
      const state = getState() as any;
      const currentOrders = state.orders.orders || [];
      const updatedOrders = [newOrder, ...currentOrders];

      // Save to storage
      await saveOrdersToStorage(userId, updatedOrders);

      return newOrder;
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }
);

// Async thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status, userId }: {
    orderId: string;
    status: 'paid' | 'delivered';
    userId: string;
  }, { getState }) => {
    try {
      const state = getState() as any;
      const currentOrders = state.orders.orders || [];
      
      const updatedOrders = currentOrders.map((order: Order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: Date.now() }
          : order
      );

      // Save to storage
      await saveOrdersToStorage(userId, updatedOrders);

      return { orderId, status };
    } catch (error) {
      throw new Error('Failed to update order status');
    }
  }
);

// Clear orders on sign out
export const clearOrders = createAsyncThunk(
  'orders/clearOrders',
  async () => {
    return [];
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load user orders
      .addCase(loadUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(loadUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load orders';
      })
      
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [action.payload, ...state.orders];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = status;
          state.orders[orderIndex].updatedAt = Date.now();
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update order';
      })
      
      // Clear orders
      .addCase(clearOrders.fulfilled, (state) => {
        state.orders = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setError, clearError } = ordersSlice.actions;
export default ordersSlice.reducer; 