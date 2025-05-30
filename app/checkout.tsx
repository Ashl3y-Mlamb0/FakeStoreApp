import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Button, 
  TextInput, 
  Divider, 
  Card, 
  List, 
  Headline, 
  RadioButton, 
  useTheme,
  ProgressBar
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { RootState } from '../src/redux/store';
import { clearCart } from '../src/redux/slices/cartSlice';
import { createOrder } from '../src/redux/slices/ordersSlice';
import { getSession } from '../src/redux/slices/authSlice';
import { AppDispatch } from '../src/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CheckoutScreen() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [address, setAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
  const { user, session } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (!session) {
      router.replace('/auth/sign-in');
      return;
    }
    
    if (items.length === 0) {
      router.back();
    }
  }, [session, items, router]);

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const isAddressValid = () => {
    const requiredFields = ['fullName', 'addressLine1', 'city', 'state', 'zipCode', 'country', 'phoneNumber'];
    return requiredFields.every(field => address[field as keyof typeof address]);
  };

  const handleNextStep = () => {
    if (step === 1 && !isAddressValid()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      Alert.alert('Error', 'Please sign in to place an order');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create the order
      await dispatch(createOrder({
        userId: user.id,
        items: items,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity
      })).unwrap();

      // Clear the cart
      dispatch(clearCart());
      
      setIsProcessing(false);
      
      Alert.alert(
        'Order Placed!', 
        'Your order has been successfully placed and can be viewed in the Orders tab.',
        [{ 
          text: 'View Orders', 
          onPress: () => router.push('/(tabs)/orders')
        }, {
          text: 'Continue Shopping',
          onPress: () => router.push('/(tabs)')
        }]
      );
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  const renderShippingStep = () => (
    <View style={styles.stepContent}>
      <Headline style={styles.stepTitle}>Shipping Address</Headline>
      
      <TextInput
        label="Full Name *"
        value={address.fullName}
        onChangeText={(value) => handleAddressChange('fullName', value)}
        mode="outlined"
        style={styles.input}
      />
      
      <TextInput
        label="Address Line 1 *"
        value={address.addressLine1}
        onChangeText={(value) => handleAddressChange('addressLine1', value)}
        mode="outlined"
        style={styles.input}
      />
      
      <TextInput
        label="Address Line 2"
        value={address.addressLine2}
        onChangeText={(value) => handleAddressChange('addressLine2', value)}
        mode="outlined"
        style={styles.input}
      />
      
      <View style={styles.row}>
        <TextInput
          label="City *"
          value={address.city}
          onChangeText={(value) => handleAddressChange('city', value)}
          mode="outlined"
          style={[styles.input, styles.rowInput]}
        />
        
        <TextInput
          label="State *"
          value={address.state}
          onChangeText={(value) => handleAddressChange('state', value)}
          mode="outlined"
          style={[styles.input, styles.rowInput]}
        />
      </View>
      
      <View style={styles.row}>
        <TextInput
          label="Zip Code *"
          value={address.zipCode}
          onChangeText={(value) => handleAddressChange('zipCode', value)}
          mode="outlined"
          style={[styles.input, styles.rowInput]}
          keyboardType="number-pad"
        />
        
        <TextInput
          label="Country *"
          value={address.country}
          onChangeText={(value) => handleAddressChange('country', value)}
          mode="outlined"
          style={[styles.input, styles.rowInput]}
        />
      </View>
      
      <TextInput
        label="Phone Number *"
        value={address.phoneNumber}
        onChangeText={(value) => handleAddressChange('phoneNumber', value)}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
      />
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <Headline style={styles.stepTitle}>Payment Method</Headline>
      
      <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
        <Card style={styles.paymentCard}>
          <Card.Content style={styles.paymentCardContent}>
            <View style={styles.paymentMethod}>
              <View style={styles.paymentInfo}>
                <MaterialCommunityIcons name="credit-card" size={24} color={colors.primary} />
                <Text variant="bodyLarge" style={styles.paymentLabel}>Credit Card</Text>
              </View>
              <RadioButton value="credit" />
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.paymentCard}>
          <Card.Content style={styles.paymentCardContent}>
            <View style={styles.paymentMethod}>
              <View style={styles.paymentInfo}>
                <MaterialCommunityIcons name="wallet" size={24} color={colors.primary} />
                <Text variant="bodyLarge" style={styles.paymentLabel}>PayPal</Text>
              </View>
              <RadioButton value="paypal" />
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.paymentCard}>
          <Card.Content style={styles.paymentCardContent}>
            <View style={styles.paymentMethod}>
              <View style={styles.paymentInfo}>
                <MaterialCommunityIcons name="cash-multiple" size={24} color={colors.primary} />
                <Text variant="bodyLarge" style={styles.paymentLabel}>Cash on Delivery</Text>
              </View>
              <RadioButton value="cod" />
            </View>
          </Card.Content>
        </Card>
      </RadioButton.Group>
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContent}>
      <Headline style={styles.stepTitle}>Order Review</Headline>
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.summaryTitle}>Order Summary</Text>
          <Divider style={styles.divider} />
          
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text variant="bodyMedium" style={styles.orderItemTitle}>
                {item.title}
              </Text>
              <Text variant="bodySmall">
                Quantity: {item.quantity} × ${item.price.toFixed(2)}
              </Text>
              <Text variant="bodyMedium" style={styles.orderItemTotal}>
                ${(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          <View style={styles.totalRow}>
            <Text variant="titleMedium">Total: ${totalAmount.toFixed(2)}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.summaryTitle}>Shipping Address</Text>
          <Divider style={styles.divider} />
          <Text variant="bodyMedium">
            {address.fullName}{'\n'}
            {address.addressLine1}{'\n'}
            {address.addressLine2 ? `${address.addressLine2}\n` : ''}
            {address.city}, {address.state} {address.zipCode}{'\n'}
            {address.country}{'\n'}
            {address.phoneNumber}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.summaryTitle}>Payment Method</Text>
          <Divider style={styles.divider} />
          <Text variant="bodyMedium">
            {paymentMethod === 'credit' && 'Credit Card'}
            {paymentMethod === 'paypal' && 'PayPal'}
            {paymentMethod === 'cod' && 'Cash on Delivery'}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Checkout",
          headerBackTitle: "Back"
        }}
      />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.progressContainer}>
          <Text variant="titleMedium" style={styles.progressTitle}>
            Step {step} of 3
          </Text>
          <ProgressBar progress={step / 3} style={styles.progressBar} />
        </View>

        {step === 1 && renderShippingStep()}
        {step === 2 && renderPaymentStep()}
        {step === 3 && renderReviewStep()}

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handlePrevStep}
            style={styles.button}
          >
            {step === 1 ? 'Back' : 'Previous'}
          </Button>

          {step < 3 ? (
            <Button
              mode="contained"
              onPress={handleNextStep}
              style={styles.button}
              disabled={step === 1 && !isAddressValid()}
            >
              Next
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handlePlaceOrder}
              style={styles.button}
              loading={isProcessing}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
  },
  stepContent: {
    marginBottom: 24,
  },
  stepTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 0.48,
  },
  paymentCard: {
    marginBottom: 16,
  },
  paymentCardContent: {
    paddingVertical: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentLabel: {
    marginLeft: 12,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  orderItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderItemTitle: {
    fontWeight: 'bold',
  },
  orderItemTotal: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  totalRow: {
    alignItems: 'center',
    paddingTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    flex: 0.45,
  },
}); 