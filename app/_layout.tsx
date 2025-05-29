import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '../src/config/theme';
import { store } from '../src/redux/store';
import { useDispatch } from 'react-redux';
import { getSession } from '../src/redux/slices/authSlice';
import { AppDispatch } from '../src/redux/store';

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}

function AppNavigator() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check for existing session on app start
    dispatch(getSession());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="category/[category]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          title: "Checkout",
          headerShown: true,
        }}
      />
    </Stack>
  );
} 