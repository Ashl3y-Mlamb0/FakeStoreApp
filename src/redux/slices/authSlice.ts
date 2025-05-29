import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/client';
import { AuthState, SignInCredentials, SignUpCredentials, User } from '../../types/user';

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

// Async thunks for authentication
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: SignInCredentials, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: SignUpCredentials, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          },
        },
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSession = createAsyncThunk(
  'auth/getSession',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data;
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
      state.session = action.payload.session;
      state.user = action.payload.user;
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
      state.session = action.payload.session;
      state.user = action.payload.user;
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
      state.session = action.payload.session;
      if (action.payload.session) {
        state.user = action.payload.session.user;
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