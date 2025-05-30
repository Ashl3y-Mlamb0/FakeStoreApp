import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme, spacing } from '../src/config/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Show splash for minimum time then check auth
    const timer = setTimeout(() => {
      checkAuthState();
    }, 2500);

    return () => clearTimeout(timer);
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      {/* Gradient Background Effect */}
      <View style={styles.gradientOverlay} />
      
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        {/* App Logo/Icon */}
        <View style={styles.logoContainer}>
          <View style={[styles.iconWrapper, { backgroundColor: theme.colors.onPrimary }]}>
            <MaterialCommunityIcons 
              name="shopping" 
              size={80} 
              color={theme.colors.primary}
            />
          </View>
        </View>

        {/* App Title */}
        <Text 
          variant="displayMedium" 
          style={[styles.title, { color: theme.colors.onPrimary }]}
        >
          Fake Store
        </Text>
        
        {/* Tagline */}
        <Text 
          variant="titleMedium" 
          style={[styles.tagline, { color: theme.colors.primaryContainer }]}
        >
          Shop. Discover. Enjoy.
        </Text>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={theme.colors.onPrimary}
          />
        </View>
      </Animated.View>

      {/* Bottom Branding */}
      <View style={styles.bottomContainer}>
        <Text 
          variant="bodyMedium" 
          style={[styles.brandText, { color: theme.colors.primaryContainer }]}
        >
          Powered by React Native
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(156, 39, 176, 0.1)', // Light purple overlay
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  iconWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  tagline: {
    textAlign: 'center',
    marginBottom: spacing.xxl,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  loadingContainer: {
    marginTop: spacing.xl,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    alignItems: 'center',
  },
  brandText: {
    opacity: 0.7,
    fontSize: 12,
  },
}); 