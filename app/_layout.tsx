import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { lightTheme } from '../src/config/theme';
import { store } from '../src/redux/store';

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={lightTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen 
            name="checkout" 
            options={{
              headerShown: true,
              title: "Checkout",
            }}
          />
          <Stack.Screen name="category/[category]" />
          <Stack.Screen name="product/[id]" />
        </Stack>
      </PaperProvider>
    </ReduxProvider>
  );
} 