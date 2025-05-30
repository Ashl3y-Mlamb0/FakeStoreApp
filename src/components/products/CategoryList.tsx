import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Text, useTheme, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category } from '../../types/product';
import { spacing, borderRadius, elevation } from '../../config/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 3) / 2;

type CategoryListProps = {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  isLoading?: boolean;
};

// Category icons mapping
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: any } = {
    "electronics": "cellphone",
    "jewelery": "diamond",
    "men's clothing": "tshirt-crew",
    "women's clothing": "hanger",
  };
  return iconMap[category] || "shopping";
};

// Category colors for visual distinction
const getCategoryColor = (category: string, colors: any): string => {
  const colorMap: { [key: string]: string } = {
    "electronics": colors.secondary,
    "jewelery": colors.tertiary,
    "men's clothing": colors.primary,
    "women's clothing": colors.accent,
  };
  return colorMap[category] || colors.primary;
};

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  onCategoryPress,
  isLoading = false,
}) => {
  const { colors } = useTheme();

  const renderCategoryItem = ({ item, index }: { item: Category; index: number }) => {
    const isEven = index % 2 === 0;
    const categoryColor = getCategoryColor(item, colors);
    const categoryIcon = getCategoryIcon(item);
    
    return (
      <TouchableOpacity 
        style={[
          styles.categoryItem,
          { marginRight: isEven ? spacing.sm : 0, marginLeft: isEven ? 0 : spacing.sm }
        ]}
        onPress={() => onCategoryPress(item)}
        activeOpacity={0.8}
      >
        <Surface style={[styles.card, { backgroundColor: colors.surface }]} elevation={3}>
          <View style={styles.cardContentWrapper}>
            {/* Category Icon Background */}
            <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
              <MaterialCommunityIcons 
                name={categoryIcon} 
                size={32} 
                color={colors.onPrimary}
              />
            </View>
            
            {/* Category Content */}
            <View style={styles.cardContent}>
              <Text 
                variant="titleMedium" 
                style={[styles.categoryTitle, { color: colors.onSurface }]}
                numberOfLines={2}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
              
              <View style={styles.shopNowContainer}>
                <Text 
                  variant="bodySmall" 
                  style={[styles.shopNowText, { color: categoryColor }]}
                >
                  Shop Now
                </Text>
                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={16} 
                  color={categoryColor}
                />
              </View>
            </View>
            
            {/* Decorative element */}
            <View style={[styles.decorativeStripe, { backgroundColor: categoryColor }]} />
          </View>
        </Surface>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text 
        variant="headlineSmall" 
        style={[styles.headerTitle, { color: colors.onBackground }]}
      >
        Shop by Category
      </Text>
      <Text 
        variant="bodyMedium" 
        style={[styles.headerSubtitle, { color: colors.onSurfaceVariant }]}
      >
        Discover our curated collections
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  categoryItem: {
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: borderRadius.large,
    minHeight: 160,
  },
  cardContentWrapper: {
    overflow: 'hidden',
    borderRadius: borderRadius.large,
    minHeight: 160,
  },
  iconContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardContent: {
    padding: spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  shopNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  shopNowText: {
    fontWeight: '600',
    marginRight: spacing.xs,
    fontSize: 12,
  },
  decorativeStripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});

export default CategoryList; 