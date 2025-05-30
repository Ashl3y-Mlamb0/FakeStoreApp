import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, Headline, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../src/redux/store';
import { signUp, clearError } from '../../src/redux/slices/authSlice';
import { AppDispatch } from '../../src/redux/store';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      // Navigate to profile after successful registration
      router.replace('/(tabs)/profile');
    }
  }, [session, router]);

  useEffect(() => {
    if (error) {
      Alert.alert('Sign Up Error', error);
    }
  }, [error]);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Please enter a password');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;
    
    dispatch(signUp({ name: name.trim(), email: email.trim(), password }));
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    dispatch(clearError());
  };

  const navigateToSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Sign up a new user</Headline>

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
          onPress={handleSignUp}
          style={[styles.button, styles.signUpButton]}
          loading={loading}
          disabled={loading}
        >
          Sign Up
        </Button>
      </View>

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
  signUpButton: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
}); 