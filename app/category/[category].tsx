import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductList from '../../src/components/products/ProductList';
import LoadingIndicator from '../../src/components/common/LoadingIndicator';
import { getProductsByCategory } from '../../src/services/api/products';
import { Product } from '../../src/types/product';

export default function ProductListScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (category) {
      fetchProducts(category);
    }
  }, [category]);

  const fetchProducts = async (categoryName: string) => {
    try {
      setLoading(true);
      const data = await getProductsByCategory(categoryName);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(`Error fetching products for category ${categoryName}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const formattedCategoryName = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : 'Products';

  if (loading) {
    return <LoadingIndicator message="Loading products..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content 
          title={formattedCategoryName}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <ProductList 
        products={products} 
        onProductPress={handleProductPress} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
}); 