import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from '../../components/Card';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Dog Food',
    description: 'High-quality nutrition for your dog',
    price: '$29.99',
    image: 'https://example.com/dogfood.jpg',
    category: 'Food',
  },
  {
    id: '2',
    name: 'Cat Scratching Post',
    description: 'Durable scratching post with platforms',
    price: '$39.99',
    image: 'https://example.com/scratchpost.jpg',
    category: 'Accessories',
  },
  {
    id: '3',
    name: 'Pet Bed',
    description: 'Comfortable bed for cats and small dogs',
    price: '$45.99',
    image: 'https://example.com/petbed.jpg',
    category: 'Furniture',
  },
  {
    id: '4',
    name: 'Interactive Toy Set',
    description: 'Set of engaging pet toys',
    price: '$19.99',
    image: 'https://example.com/toys.jpg',
    category: 'Toys',
  },
];

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <TouchableOpacity onPress={() => onPress(product)}>
    <Card style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        defaultSource={require('../../assets/images/placeholder.png')}
      />
      <View style={styles.cardContent}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

export const MarketplaceScreen = () => {
  const handleProductPress = (product: Product) => {
    // Handle product selection
    console.log('Selected product:', product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Shop</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
  },
  list: {
    padding: 15,
  },
  card: {
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  category: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});
