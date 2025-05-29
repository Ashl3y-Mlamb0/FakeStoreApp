import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { Product } from '../../types/product';

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Card.Content style={styles.content}>
          <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
            {product.title}
          </Text>
          <Text variant="bodyLarge" style={[styles.price, { color: theme.colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    height: 260,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 160,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 8,
    height: 44,
    lineHeight: 22,
  },
  price: {
    fontWeight: '700',
    fontSize: 18,
  },
});

export default ProductCard; 