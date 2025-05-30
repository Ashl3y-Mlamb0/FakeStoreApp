import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, Headline, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../src/redux/store';
import { signIn, clearError } from '../../src/redux/slices/authSlice';
import { AppDispatch } from '../../src/redux/store';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={styles.container}>
      <Headline style={styles.title}>Sign in with your email and password</Headline>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error && error.includes('email')}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
        error={error && error.includes('password')}
      />

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={handleClear}
          style={[styles.button, styles.clearButton]}
          disabled={loading}
        >
          Clear
        </Button>

        <Button
          mode="contained"
          onPress={handleSignIn}
          style={[styles.button, styles.signInButton]}
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </View>

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text style={{ color: colors.primary }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    flex: 0.45,
  },
  clearButton: {
    marginRight: 8,
  },
  signInButton: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
}); 