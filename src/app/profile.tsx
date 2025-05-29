import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Avatar, Card, Divider, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../redux/store';
import { signOut, getSession } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { user, loading, session } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (!session) {
      router.replace('/auth/sign-in');
    }
  }, [session, router]);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={user.name ? user.name.substring(0, 2).toUpperCase() : user.email.substring(0, 2).toUpperCase()} 
          style={{ backgroundColor: colors.primary }}
        />
        <Text style={styles.name}>{user.name || 'User'}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Card style={styles.statsCard}>
        <Card.Content style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="cart" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{items.length}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </View>
          
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="shopping" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="heart" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="Account Settings" />
        <Card.Content>
          <Button 
            icon="account-edit" 
            mode="outlined" 
            style={styles.button}
          >
            Edit Profile
          </Button>
          
          <Button 
            icon="lock-reset" 
            mode="outlined" 
            style={styles.button}
          >
            Change Password
          </Button>
          
          <Button 
            icon="map-marker" 
            mode="outlined" 
            style={styles.button}
          >
            Manage Addresses
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="Preferences" />
        <Card.Content>
          <Button 
            icon="bell" 
            mode="outlined" 
            style={styles.button}
          >
            Notification Settings
          </Button>
          
          <Button 
            icon="theme-light-dark" 
            mode="outlined" 
            style={styles.button}
          >
            Theme Settings
          </Button>
        </Card.Content>
      </Card>

      <Button 
        icon="logout" 
        mode="contained" 
        onPress={handleSignOut}
        style={styles.signOutButton}
        loading={loading}
      >
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  email: {
    fontSize: 16,
    marginTop: 4,
    opacity: 0.7,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  signOutButton: {
    marginVertical: 24,
    borderRadius: 8,
  },
}); 