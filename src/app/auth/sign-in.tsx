import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Headline, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../redux/store';
import { signIn, clearError } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

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
      router.replace('/');
    }
  }, [session, router]);

  const handleSignIn = () => {
    if (email && password) {
      dispatch(signIn({ email, password }));
    }
  };

  const navigateToSignUp = () => {
    router.push('/auth/sign-up');
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Sign In</Headline>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

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

      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}
        loading={loading}
        disabled={loading || !email || !password}
      >
        Sign In
      </Button>

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