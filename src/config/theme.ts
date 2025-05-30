import { MD3LightTheme as DefaultTheme, MD3DarkTheme } from 'react-native-paper';

// Fake Store App Color Palette
const colors = {
  // Primary Purple
  primary: '#6A1B9A',
  primaryContainer: '#E1BEE7',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#4A148C',
  
  // Accent Colors
  secondary: '#3F51B5', // Indigo
  secondaryContainer: '#C5CAE9',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#1A237E',
  
  tertiary: '#FF4081', // Pink
  tertiaryContainer: '#FCE4EC',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#AD1457',
  
  // Call-to-Action
  accent: '#FFCA28', // Amber
  accentContainer: '#FFF9C4',
  onAccent: '#424242',
  
  // Surfaces
  background: '#FFFFFF',
  onBackground: '#424242',
  surface: '#F5F5F5',
  onSurface: '#424242',
  surfaceVariant: '#E8E8E8',
  onSurfaceVariant: '#616161',
  
  // Semantic Colors
  error: '#D32F2F',
  onError: '#FFFFFF',
  errorContainer: '#FFEBEE',
  onErrorContainer: '#B71C1C',
  
  success: '#388E3C',
  onSuccess: '#FFFFFF',
  successContainer: '#E8F5E8',
  onSuccessContainer: '#1B5E20',
  
  warning: '#F57C00',
  onWarning: '#FFFFFF',
  warningContainer: '#FFF3E0',
  onWarningContainer: '#E65100',
  
  // Utility
  outline: '#BDBDBD',
  outlineVariant: '#E0E0E0',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#424242',
  inverseOnSurface: '#FFFFFF',
  inversePrimary: '#B388FF',
  
  // Shopping-specific colors
  price: '#4CAF50',
  originalPrice: '#9E9E9E',
  discount: '#FF5722',
  rating: '#FFC107',
  
  // Status colors for orders
  statusNew: '#FF4081',
  statusPaid: '#FFCA28',
  statusDelivered: '#4CAF50',
};

const darkColors = {
  ...colors,
  // Dark theme overrides
  primary: '#B388FF',
  primaryContainer: '#4A148C',
  onPrimary: '#000000',
  onPrimaryContainer: '#E1BEE7',
  
  background: '#121212',
  onBackground: '#FFFFFF',
  surface: '#1E1E1E',
  onSurface: '#FFFFFF',
  surfaceVariant: '#2C2C2C',
  onSurfaceVariant: '#E0E0E0',
  
  outline: '#616161',
  outlineVariant: '#424242',
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

// Export default theme (can be switched based on system preference)
export const theme = lightTheme;

// Shopping-specific styling constants
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const elevation = {
  small: 2,
  medium: 4,
  large: 8,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
}; 