import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { Text, Button, Avatar, Card, Divider, useTheme, Portal, Modal, TextInput, Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../src/redux/store';
import { signOut, getSession } from '../../src/redux/slices/authSlice';
import { AppDispatch } from '../../src/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mockAuth } from '../../src/services/auth/mockAuth';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [updating, setUpdating] = useState(false);
  
  const { user, loading, session } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const { orders } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (!session) {
      router.replace('/auth/sign-in');
    }
  }, [session, router]);

  useEffect(() => {
    if (user) {
      setUpdateForm({
        name: user.name || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleUpdateProfile = async () => {
    if (!updateForm.name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return;
    }

    if (updateForm.password && updateForm.password !== updateForm.confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    if (updateForm.password && updateForm.password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return;
    }

    setUpdating(true);

    try {
      // Since we're using mock auth, we'll simulate updating the user profile
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      Alert.alert('Success', 'Profile updated successfully!');
      setUpdateModalVisible(false);
      setUpdateForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelUpdate = () => {
    setUpdateModalVisible(false);
    if (user) {
      setUpdateForm({
        name: user.name || '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  if (!user) {
    return null;
  }

  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const newOrdersCount = orders.filter(order => order.status === 'new').length;
  const totalOrdersCount = orders.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title="Profile" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      
      <ScrollView style={styles.scrollContainer}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Avatar.Text 
                size={80} 
                label={user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                style={{ backgroundColor: colors.primary }}
              />
              <View style={styles.profileInfo}>
                <Text variant="headlineSmall" style={styles.userName}>
                  {user.name || 'User'}
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
                  {user.email}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.statsTitle}>
              Account Statistics
            </Text>
            <Divider style={styles.divider} />
            
            <View style={styles.statRow}>
              <MaterialCommunityIcons 
                name="cart-outline" 
                size={24} 
                color={colors.primary} 
              />
              <Text variant="bodyLarge" style={styles.statText}>
                Cart Items: {totalCartItems}
              </Text>
            </View>

            <View style={styles.statRow}>
              <MaterialCommunityIcons 
                name="receipt" 
                size={24} 
                color={colors.primary} 
              />
              <Text variant="bodyLarge" style={styles.statText}>
                Total Orders: {totalOrdersCount}
              </Text>
            </View>

            <View style={styles.statRow}>
              <MaterialCommunityIcons 
                name="clock-alert" 
                size={24} 
                color={colors.error} 
              />
              <Text variant="bodyLarge" style={styles.statText}>
                New Orders: {newOrdersCount}
              </Text>
            </View>

            <View style={styles.statRow}>
              <MaterialCommunityIcons 
                name="account-check-outline" 
                size={24} 
                color={colors.primary} 
              />
              <Text variant="bodyLarge" style={styles.statText}>
                Member since: {new Date().getFullYear()}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.actionsTitle}>
              Account Actions
            </Text>
            <Divider style={styles.divider} />

            <Button
              mode="contained"
              onPress={() => setUpdateModalVisible(true)}
              style={styles.actionButton}
              icon="account-edit"
            >
              Update Profile
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push('/checkout')}
              style={styles.actionButton}
              disabled={totalCartItems === 0}
              icon="cart-outline"
            >
              Go to Checkout ({totalCartItems} items)
            </Button>

            <Button
              mode="text"
              onPress={handleSignOut}
              style={styles.signOutButton}
              icon="logout"
              textColor={colors.error}
            >
              Sign Out
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Update Profile Modal */}
      <Portal>
        <Modal
          visible={updateModalVisible}
          onDismiss={handleCancelUpdate}
          contentContainerStyle={[styles.modal, { backgroundColor: colors.surface }]}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Update Profile
          </Text>
          
          <TextInput
            label="Full Name"
            value={updateForm.name}
            onChangeText={(value) => setUpdateForm(prev => ({ ...prev, name: value }))}
            mode="outlined"
            style={styles.modalInput}
          />
          
          <TextInput
            label="New Password (optional)"
            value={updateForm.password}
            onChangeText={(value) => setUpdateForm(prev => ({ ...prev, password: value }))}
            mode="outlined"
            secureTextEntry
            style={styles.modalInput}
          />
          
          <TextInput
            label="Confirm New Password"
            value={updateForm.confirmPassword}
            onChangeText={(value) => setUpdateForm(prev => ({ ...prev, confirmPassword: value }))}
            mode="outlined"
            secureTextEntry
            style={styles.modalInput}
            disabled={!updateForm.password}
          />
          
          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={handleCancelUpdate}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            
            <Button
              mode="contained"
              onPress={handleUpdateProfile}
              style={styles.modalButton}
              loading={updating}
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Confirm'}
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statText: {
    marginLeft: 12,
  },
  actionsCard: {
    marginBottom: 16,
  },
  actionsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
  signOutButton: {
    marginTop: 8,
  },
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 0.45,
  },
});