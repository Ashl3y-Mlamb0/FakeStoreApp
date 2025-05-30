import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Check for existing session directly from AsyncStorage
      const session = await AsyncStorage.getItem('fake-store-auth-session');
      
      if (session) {
        const sessionData = JSON.parse(session);
        // Check if session is not expired
        if (sessionData.expiresAt > Date.now()) {
          // User is logged in, go to main app
          router.replace('/(tabs)');
        } else {
          // Session expired, go to auth
          await AsyncStorage.removeItem('fake-store-auth-session');
          router.replace('/auth/sign-in');
        }
      } else {
        // User is not logged in, go to auth
        router.replace('/auth/sign-in');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      // Default to auth screen on error
      router.replace('/auth/sign-in');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
} 