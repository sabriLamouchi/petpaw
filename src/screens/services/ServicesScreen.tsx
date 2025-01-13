import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Card } from '../../components/Card';

interface Service {
  id: string;
  title: string;
  description: string;
  phoneNumber: string;
  image: string;
  type: 'vet' | 'groomer' | 'trainer' | 'sitter';
}

const services: Service[] = [
  {
    id: '1',
    title: 'Dr. Sarah Wilson',
    description: 'Experienced veterinarian specializing in small animals',
    phoneNumber: '+1234567890',
    image: 'https://example.com/vet.jpg',
    type: 'vet',
  },
  {
    id: '2',
    title: 'Pet Paradise Grooming',
    description: 'Professional pet grooming services',
    phoneNumber: '+1234567891',
    image: 'https://example.com/grooming.jpg',
    type: 'groomer',
  },
  {
    id: '3',
    title: 'Max\'s Pet Training',
    description: 'Professional dog trainer with 10 years experience',
    phoneNumber: '+1234567892',
    image: 'https://example.com/training.jpg',
    type: 'trainer',
  },
  {
    id: '4',
    title: 'Lisa\'s Pet Sitting',
    description: 'Reliable pet sitting services at your home',
    phoneNumber: '+1234567893',
    image: 'https://example.com/sitting.jpg',
    type: 'sitter',
  },
];

interface ServiceCardProps {
  service: Service;
  onCallPress: (phoneNumber: string) => void;
  onChatPress: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onCallPress, onChatPress }) => (
  <Card style={styles.card}>
    <Image
      source={{ uri: service.image }}
      style={styles.image}
      defaultSource={require('../../assets/images/placeholder.png')}
    />
    <View style={styles.cardContent}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.callButton]} 
          onPress={() => onCallPress(service.phoneNumber)}
        >
          <Text style={styles.buttonText}>📞 Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.chatButton]}
          onPress={() => onChatPress(service)}
        >
          <Text style={styles.buttonText}>💬 Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Card>
);

interface ServicesScreenProps {
  onStartChat: (recipientId: string, recipientName: string, recipientImage: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onStartChat }) => {
  const renderServiceCard = ({ item }: { item: Service }) => {
    return (
      <ServiceCard
        service={item}
        onCallPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
        onChatPress={() => onStartChat(item.id, item.title, item.image)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Services</Text>
      <FlatList
        data={services}
        renderItem={renderServiceCard}
        keyExtractor={(item:any) => item.id}
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: '#34C759',
  },
  chatButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
