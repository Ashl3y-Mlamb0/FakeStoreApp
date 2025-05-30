import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/hooks/useCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';

export default function TabsLayout() {
  const { colors } = useTheme();
  const { totalQuantity } = useCart();
  const { orders } = useSelector((state: RootState) => state.orders);
  
  // Count new orders for badge
  const newOrdersCount = orders.filter(order => order.status === 'new').length;
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outlineVariant,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "grid" : "grid-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
          tabBarBadgeStyle: { 
            backgroundColor: colors.primary,
            color: colors.onPrimary,
            fontSize: 12,
            fontWeight: 'bold',
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            marginLeft: 12,
            marginTop: -8,
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Orders',
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "receipt" : "receipt-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarBadge: newOrdersCount > 0 ? newOrdersCount : undefined,
          tabBarBadgeStyle: { 
            backgroundColor: colors.tertiary,
            color: colors.onTertiary,
            fontSize: 12,
            fontWeight: 'bold',
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            marginLeft: 12,
            marginTop: -8,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
} 