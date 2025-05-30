import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import { TextInput, Button, Text, Card, useTheme, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../src/redux/store';
import { signIn, clearError } from '../../src/redux/slices/authSlice';
import { AppDispatch } from '../../src/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing, borderRadius, elevation } from '../../src/config/theme';

const { width } = Dimensions.get('window');

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { loading, error, session } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Clear any previous errors
    dispatch(clearError());
  }, []);

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
    }
  }, [session, router]);

  useEffect(() => {
    if (error) {
      Alert.alert('Sign In Error', error);
    }
  }, [error]);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }
    dispatch(signIn({ email, password }));
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    dispatch(clearError());
  };

  const navigateToSignUp = () => {
    router.push('/auth/sign-up');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Branding */}
      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
          <MaterialCommunityIcons 
            name="shopping" 
            size={48} 
            color={colors.onPrimary}
          />
        </View>
        <Text 
          variant="headlineLarge" 
          style={[styles.brandTitle, { color: colors.primary }]}
        >
          Fake Store
        </Text>
        <Text 
          variant="bodyLarge" 
          style={[styles.subtitle, { color: colors.onSurfaceVariant }]}
        >
          Welcome back! Sign in to continue shopping
        </Text>
      </View>

      {/* Sign In Form Card */}
      <Surface style={[styles.formCard, { backgroundColor: colors.surface }]} elevation={2}>
        <Text 
          variant="titleLarge" 
          style={[styles.formTitle, { color: colors.onSurface }]}
        >
          Sign in with your email and password
        </Text>

        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={error && error.includes('email')}
          left={<TextInput.Icon icon="email-outline" />}
          theme={{
            colors: {
              primary: colors.primary,
              outline: colors.outline,
            },
          }}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          error={error && error.includes('password')}
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon 
              icon={showPassword ? "eye-off" : "eye"} 
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          theme={{
            colors: {
              primary: colors.primary,
              outline: colors.outline,
            },
          }}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleClear}
            style={[styles.button, styles.clearButton]}
            disabled={loading}
            icon="broom"
            labelStyle={{ color: colors.primary }}
          >
            Clear
          </Button>

          <Button
            mode="contained"
            onPress={handleSignIn}
            style={[styles.button, styles.signInButton]}
            loading={loading}
            disabled={loading}
            icon="login"
            buttonColor={colors.primary}
            contentStyle={styles.buttonContent}
          >
            Sign In
          </Button>
        </View>
      </Surface>

      {/* Footer */}
      <View style={styles.footer}>
        <Text 
          variant="bodyMedium" 
          style={{ color: colors.onSurfaceVariant }}
        >
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={navigateToSignUp} style={styles.linkButton}>
          <Text 
            variant="bodyMedium" 
            style={[styles.linkText, { color: colors.primary }]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo Helper */}
      <Surface style={[styles.demoCard, { backgroundColor: colors.tertiaryContainer }]} elevation={1}>
        <MaterialCommunityIcons 
          name="information-outline" 
          size={20} 
          color={colors.onTertiaryContainer}
          style={styles.demoIcon}
        />
        <Text 
          variant="bodySmall" 
          style={[styles.demoText, { color: colors.onTertiaryContainer }]}
        >
          Demo: Use any email/password to sign in
        </Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    elevation: elevation.small,
  },
  brandTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  formCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.large,
    marginBottom: spacing.lg,
  },
  formTitle: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: spacing.xl,
  },
  input: {
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    borderRadius: borderRadius.medium,
  },
  buttonContent: {
    paddingVertical: spacing.xs,
  },
  clearButton: {
    borderWidth: 1.5,
  },
  signInButton: {
    elevation: elevation.small,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  linkButton: {
    paddingHorizontal: spacing.xs,
  },
  linkText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginTop: spacing.lg,
  },
  demoIcon: {
    marginRight: spacing.sm,
  },
  demoText: {
    flex: 1,
    fontStyle: 'italic',
  },
}); 