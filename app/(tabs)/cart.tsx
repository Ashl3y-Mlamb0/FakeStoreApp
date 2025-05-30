import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Image } from 'react-native';
import { Appbar, Text, Button, Card, IconButton, Divider, useTheme } from 'react-native-paper';
import { useCart } from '../../src/hooks/useCart';
import { CartItem } from '../../src/redux/slices/cartSlice';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { 
    cartItems, 
    totalQuantity, 
    totalAmount, 
    increaseItemQuantity, 
    decreaseItemQuantity, 
    removeItemFromCart 
  } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card style={styles.cartItemCard} mode="outlined">
      <Card.Content style={styles.cartItemContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
        </View>
        <View style={styles.detailsContainer}>
          <Text variant="titleMedium" numberOfLines={2} style={styles.productTitle}>
            {item.title}
          </Text>
          <Text variant="bodyLarge" style={[styles.productPrice, { color: theme.colors.primary }]}>
            ${item.price.toFixed(2)}
          </Text>
          
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              mode="contained"
              size={20}
              onPress={() => decreaseItemQuantity(item.id)}
            />
            <Text variant="titleMedium" style={styles.quantityText}>
              {item.quantity}
            </Text>
            <IconButton
              icon="plus"
              mode="contained"
              size={20}
              onPress={() => increaseItemQuantity(item.id)}
            />
            <IconButton
              icon="delete"
              mode="contained"
              size={20}
              containerColor={theme.colors.error}
              onPress={() => removeItemFromCart(item.id)}
              style={styles.deleteButton}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header elevated>
          <Appbar.Content title="Shopping Cart" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <View style={styles.emptyCartContainer}>
          <Text variant="titleLarge">Your shopping cart is empty</Text>
          <Text variant="bodyMedium" style={styles.emptyCartText}>
            Browse products and add items to your cart
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title="Shopping Cart" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      
      <View style={styles.summaryContainer}>
        <Text variant="titleMedium">Cart Summary</Text>
        <View style={styles.summaryDetails}>
          <Text>Items: {totalQuantity}</Text>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Total: ${totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <Divider />
      
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      
      <View style={styles.checkoutContainer}>
        <Button 
          mode="contained" 
          onPress={handleCheckout}
          disabled={cartItems.length === 0}
          style={styles.checkoutButton}
          icon="credit-card"
        >
          Proceed to Checkout ({totalQuantity} items)
        </Button>
      </View>
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
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  summaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  cartItemCard: {
    marginBottom: 16,
  },
  cartItemContent: {
    flexDirection: 'row',
    padding: 8,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
  },
  productTitle: {
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: '700',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityText: {
    marginHorizontal: 8,
    width: 30,
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartText: {
    marginTop: 8,
    textAlign: 'center',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  checkoutButton: {
    borderRadius: 8,
    paddingVertical: 8,
  },
}); 