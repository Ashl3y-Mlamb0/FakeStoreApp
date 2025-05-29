import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4361EE',
    secondary: '#3F37C9',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    error: '#EF476F',
    text: '#212529',
    disabled: '#ADB5BD',
    placeholder: '#6C757D',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    card: '#FFFFFF',
    border: '#E9ECEF',
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
}; 