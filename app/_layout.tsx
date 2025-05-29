import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '../src/config/theme';
import { store } from '../src/redux/store';

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
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
        </Stack>
      </PaperProvider>
    </ReduxProvider>
  );
} 