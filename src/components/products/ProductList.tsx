import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  onProductPress: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onProductPress 
}) => {
  const theme = useTheme();

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products found in this category.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={onProductPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

export default ProductList; 