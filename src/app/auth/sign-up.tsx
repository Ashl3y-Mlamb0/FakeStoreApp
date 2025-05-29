import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Headline, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../redux/store';
import { signUp, clearError } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
      router.replace('/');
    }
  }, [session, router]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignUp = () => {
    if (!validatePasswords()) return;
    
    if (name && email && password) {
      dispatch(signUp({ name, email, password }));
    }
  };

  const navigateToSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Create Account</Headline>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      {passwordError ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{passwordError}</Text>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
        loading={loading}
        disabled={loading || !name || !email || !password || !confirmPassword}
      >
        Sign Up
      </Button>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={navigateToSignIn}>
          <Text style={{ color: colors.primary }}>Sign In</Text>
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
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
}); 