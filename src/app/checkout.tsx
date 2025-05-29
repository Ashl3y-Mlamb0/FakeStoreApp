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
import { RootState } from '../redux/store';
import { clearCart } from '../redux/slices/cartSlice';
import { getSession } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
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
  
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
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
    setIsProcessing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsProcessing(false);
      dispatch(clearCart());
      Alert.alert(
        'Order Placed!', 
        'Your order has been successfully placed.',
        [{ text: 'OK', onPress: () => router.push('/') }]
      );
    }, 2000);
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
          <RadioButton.Item
            label="Credit Card"
            value="credit"
            position="leading"
          />
          <View style={styles.paymentIcons}>
            <MaterialCommunityIcons name="credit-card" size={24} color={colors.primary} />
            <MaterialCommunityIcons name="credit-card-outline" size={24} color={colors.primary} />
          </View>
        </Card>
        
        <Card style={styles.paymentCard}>
          <RadioButton.Item
            label="PayPal"
            value="paypal"
            position="leading"
          />
          <MaterialCommunityIcons name="wallet" size={24} color={colors.primary} style={styles.paymentIcons} />
        </Card>
        
        <Card style={styles.paymentCard}>
          <RadioButton.Item
            label="Cash on Delivery"
            value="cash"
            position="leading"
          />
          <MaterialCommunityIcons name="cash" size={24} color={colors.primary} style={styles.paymentIcons} />
        </Card>
      </RadioButton.Group>

      <View style={styles.shippingAddressSummary}>
        <Text style={styles.sectionTitle}>Shipping to:</Text>
        <Text>{address.fullName}</Text>
        <Text>{address.addressLine1}</Text>
        {address.addressLine2 ? <Text>{address.addressLine2}</Text> : null}
        <Text>{`${address.city}, ${address.state} ${address.zipCode}`}</Text>
        <Text>{address.country}</Text>
        <Text>{address.phoneNumber}</Text>
        
        <Button 
          mode="text" 
          onPress={() => setStep(1)} 
          style={styles.editButton}
        >
          Edit
        </Button>
      </View>
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContent}>
      <Headline style={styles.stepTitle}>Review Order</Headline>
      
      <Card style={styles.orderSummaryCard}>
        <Card.Title title="Order Summary" />
        <Card.Content>
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>{item.title}</Text>
              <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemQty}>Qty: {item.quantity}</Text>
                <Text style={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping:</Text>
            <Text style={styles.totalValue}>$0.00</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text style={styles.totalValue}>${(totalAmount * 0.07).toFixed(2)}</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.grandTotal]}>Total:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>${(totalAmount + (totalAmount * 0.07)).toFixed(2)}</Text>
          </View>
        </Card.Content>
      </Card>
      
      <View style={styles.shippingAddressSummary}>
        <Text style={styles.sectionTitle}>Shipping Information:</Text>
        <Text>{address.fullName}</Text>
        <Text>{address.addressLine1}</Text>
        {address.addressLine2 ? <Text>{address.addressLine2}</Text> : null}
        <Text>{`${address.city}, ${address.state} ${address.zipCode}`}</Text>
        <Text>{address.country}</Text>
        <Text>{address.phoneNumber}</Text>
      </View>
      
      <View style={styles.paymentSummary}>
        <Text style={styles.sectionTitle}>Payment Method:</Text>
        <Text>
          {paymentMethod === 'credit' && 'Credit Card'}
          {paymentMethod === 'paypal' && 'PayPal'}
          {paymentMethod === 'cash' && 'Cash on Delivery'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar progress={step / 3} color={colors.primary} style={styles.progressBar} />
        <View style={styles.stepsContainer}>
          <Text style={[styles.stepIndicator, step >= 1 && { color: colors.primary }]}>Shipping</Text>
          <Text style={[styles.stepIndicator, step >= 2 && { color: colors.primary }]}>Payment</Text>
          <Text style={[styles.stepIndicator, step >= 3 && { color: colors.primary }]}>Review</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {step === 1 && renderShippingStep()}
        {step === 2 && renderPaymentStep()}
        {step === 3 && renderReviewStep()}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={handlePrevStep}
          style={styles.button}
        >
          {step === 1 ? 'Cancel' : 'Back'}
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
            Place Order
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stepIndicator: {
    fontSize: 12,
    color: '#9e9e9e',
  },
  scrollView: {
    flex: 1,
  },
  stepContent: {
    padding: 16,
  },
  stepTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  paymentCard: {
    marginBottom: 12,
    padding: 4,
  },
  paymentIcons: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
  },
  shippingAddressSummary: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  paymentSummary: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  orderSummaryCard: {
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 12,
  },
  orderItemName: {
    fontSize: 16,
  },
  orderItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  orderItemQty: {
    color: '#757575',
  },
  orderItemPrice: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 18,
  },
}); 