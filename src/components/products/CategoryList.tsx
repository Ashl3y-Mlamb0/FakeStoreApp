import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { Category } from '../../types/product';

type CategoryListProps = {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  isLoading?: boolean;
};

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  onCategoryPress,
  isLoading = false,
}) => {
  const theme = useTheme();

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => onCategoryPress(item)}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.categoryTitle}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  listContent: {
    paddingVertical: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  card: {
    elevation: 2,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    paddingVertical: 24,
  },
  categoryTitle: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default CategoryList; 