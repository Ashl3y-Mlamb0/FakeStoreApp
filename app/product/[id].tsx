import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, SafeAreaView } from 'react-native';
import { Appbar, Text, Button, Card, useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LoadingIndicator from '../../src/components/common/LoadingIndicator';
import { getProductById } from '../../src/services/api/products';
import { Product } from '../../src/types/product';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('Failed to load product details. Please try again.');
      console.error(`Error fetching product ${productId}:`, err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error || 'Product not found'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Product Details" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={[styles.imageCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </Card>
        
        <Card style={[styles.detailsCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>
              {product.title}
            </Text>
            <Text variant="headlineSmall" style={[styles.price, { color: theme.colors.primary }]}>
              ${product.price.toFixed(2)}
            </Text>
            <View style={styles.categoryContainer}>
              <Text variant="bodyMedium" style={styles.category}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.description}>
              {product.description}
            </Text>
            <View style={styles.ratingContainer}>
              <Text variant="bodyMedium">Rating: {product.rating.rate}/5</Text>
              <Text variant="bodyMedium">({product.rating.count} reviews)</Text>
            </View>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              disabled={true}
              onPress={() => {}}
            >
              Add to Shopping Cart
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
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
  imageCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: width - 64,
    height: '80%',
  },
  detailsCard: {
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    marginBottom: 12,
    fontWeight: '600',
  },
  price: {
    marginBottom: 12,
    fontWeight: '700',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  category: {
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  description: {
    marginBottom: 16,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonLabel: {
    paddingVertical: 4,
    fontSize: 16,
  },
}); 