import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Card } from '../../components/Card';

// Mock data - replace with actual API call
const ADOPTION_LISTINGS = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    location: 'New York, NY',
    image: 'https://placeholder.com/150',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 1,
    location: 'Los Angeles, CA',
    image: 'https://placeholder.com/150',
  },
  // Add more listings...
];

export const AdoptionScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AdoptionDetails', { pet: item })}
    >
      <Card style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.petImage}
          resizeMode="cover"
        />
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petBreed}>
            {item.species} • {item.breed}
          </Text>
          <Text style={styles.petDetails}>
            {item.age} years old • {item.location}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Your New Best Friend</Text>
      <FlatList
        data={ADOPTION_LISTINGS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
    padding: 16,
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  petImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  petInfo: {
    padding: 16,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  petBreed: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: '#888',
  },
});
