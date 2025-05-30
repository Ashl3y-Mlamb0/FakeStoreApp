import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Button, Avatar, Divider, useTheme, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import { updateOrderStatus } from '../../src/redux/slices/ordersSlice';
import { AppDispatch } from '../../src/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Order } from '../../src/redux/slices/ordersSlice';

export default function OrdersScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  const { user } = useSelector((state: RootState) => state.auth);

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const handlePayOrder = async (order: Order) => {
    try {
      await dispatch(updateOrderStatus({
        orderId: order.id,
        status: 'paid',
        userId: user!.id
      })).unwrap();
      Alert.alert('Success', 'Order has been paid successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const handleReceiveOrder = async (order: Order) => {
    try {
      await dispatch(updateOrderStatus({
        orderId: order.id,
        status: 'delivered',
        userId: user!.id
      })).unwrap();
      Alert.alert('Success', 'Order has been marked as delivered!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const getOrdersByStatus = (status: 'new' | 'paid' | 'delivered') => {
    return orders.filter(order => order.status === status);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderOrderSection = (title: string, orders: Order[], statusColor: string) => (
    <View style={styles.section}>
      <Text variant="titleMedium" style={[styles.sectionTitle, { color: statusColor }]}>
        {title} ({orders.length})
      </Text>
      {orders.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Text style={{ textAlign: 'center', color: colors.onSurfaceVariant }}>
              No {title.toLowerCase()} orders
            </Text>
          </Card.Content>
        </Card>
      ) : (
        orders.map(order => (
          <Card key={order.id} style={styles.orderCard}>
            <TouchableOpacity onPress={() => toggleOrderExpansion(order.id)}>
              <Card.Content>
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text variant="bodyLarge" style={styles.orderId}>
                      {order.id}
                    </Text>
                    <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
                      {order.totalQuantity} items • {formatPrice(order.totalAmount)}
                    </Text>
                    <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                      {formatDate(order.createdAt)}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name={expandedOrders.has(order.id) ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={colors.onSurface}
                  />
                </View>
              </Card.Content>
            </TouchableOpacity>

            {expandedOrders.has(order.id) && (
              <>
                <Divider />
                <Card.Content style={styles.orderDetails}>
                  <Text variant="titleSmall" style={styles.itemsTitle}>Order Items:</Text>
                  {order.items.map((item, index) => (
                    <View key={`${item.id}-${index}`} style={styles.orderItem}>
                      <Avatar.Image size={40} source={{ uri: item.image }} />
                      <View style={styles.itemInfo}>
                        <Text variant="bodyMedium" numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                          Qty: {item.quantity} • {formatPrice(item.price * item.quantity)}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <Divider style={styles.actionsDivider} />
                  
                  {order.status === 'new' && (
                    <Button
                      mode="contained"
                      onPress={() => handlePayOrder(order)}
                      style={styles.actionButton}
                      icon="credit-card"
                      loading={loading}
                    >
                      Pay Order
                    </Button>
                  )}

                  {order.status === 'paid' && (
                    <Button
                      mode="contained"
                      onPress={() => handleReceiveOrder(order)}
                      style={styles.actionButton}
                      icon="package-variant"
                      loading={loading}
                    >
                      Mark as Received
                    </Button>
                  )}

                  {order.status === 'delivered' && (
                    <View style={styles.deliveredBadge}>
                      <MaterialCommunityIcons name="check-circle" size={20} color={colors.primary} />
                      <Text style={{ color: colors.primary, marginLeft: 8 }}>
                        Order Completed
                      </Text>
                    </View>
                  )}
                </Card.Content>
              </>
            )}
          </Card>
        ))
      )}
    </View>
  );

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Please sign in to view your orders</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="headlineMedium" style={styles.title}>My Orders</Text>
      
      {renderOrderSection('New Orders', getOrdersByStatus('new'), colors.error)}
      {renderOrderSection('Paid Orders', getOrdersByStatus('paid'), colors.tertiary)}
      {renderOrderSection('Delivered Orders', getOrdersByStatus('delivered'), colors.primary)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  emptyCard: {
    marginBottom: 8,
  },
  orderCard: {
    marginBottom: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDetails: {
    paddingTop: 16,
  },
  itemsTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  actionsDivider: {
    marginVertical: 16,
  },
  actionButton: {
    marginTop: 8,
  },
  deliveredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
}); 