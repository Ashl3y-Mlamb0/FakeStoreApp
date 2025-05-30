import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAuth, User, AuthSession } from '../../services/auth/mockAuth';
import { AuthState, SignInCredentials, SignUpCredentials } from '../../types/user';
import { loadUserCart, clearUserCart, saveUserCart } from './cartSlice';
import { loadUserOrders, clearOrders } from './ordersSlice';

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

// Async thunks for authentication
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: SignInCredentials, { rejectWithValue, dispatch }) => {
    try {
      const result = await mockAuth.signIn(credentials.email, credentials.password);
      
      if (!result.success) {
        return rejectWithValue(result.error || 'Sign in failed');
      }
      
      // Load user-specific cart and orders after successful sign in
      if (result.session) {
        dispatch(loadUserCart(result.session.user.id));
        dispatch(loadUserOrders(result.session.user.id));
      }
      
      return result.session;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: SignUpCredentials, { rejectWithValue, dispatch }) => {
    try {
      const result = await mockAuth.signUp(credentials.email, credentials.password, credentials.name);
      
      if (!result.success) {
        return rejectWithValue(result.error || 'Sign up failed');
      }
      
      // Load user-specific cart and orders after successful sign up (will be empty for new user)
      if (result.session) {
        dispatch(loadUserCart(result.session.user.id));
        dispatch(loadUserOrders(result.session.user.id));
      }
      
      return result.session;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      // Save current cart before signing out
      const state = getState() as any;
      if (state.cart.userId && state.cart.items.length > 0) {
        await dispatch(saveUserCart({ 
          userId: state.cart.userId, 
          items: state.cart.items 
        }));
      }
      
      // Clear cart and orders state
      dispatch(clearUserCart());
      dispatch(clearOrders());
      
      const result = await mockAuth.signOut();
      
      if (!result.success) {
        return rejectWithValue(result.error || 'Sign out failed');
      }
      
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSession = createAsyncThunk(
  'auth/getSession',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const result = await mockAuth.getSession();
      
      if (result.error) {
        return rejectWithValue(result.error);
      }
      
      // Load user-specific cart and orders if session exists
      if (result.session) {
        dispatch(loadUserCart(result.session.user.id));
        dispatch(loadUserOrders(result.session.user.id));
      }
      
      return result.session;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.session = action.payload;
        state.user = action.payload.user;
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.session = action.payload;
        state.user = action.payload.user;
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Out
    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.session = null;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Session
    builder.addCase(getSession.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.session = action.payload;
        state.user = action.payload.user;
      }
    });
    builder.addCase(getSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer; 