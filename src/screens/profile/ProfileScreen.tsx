import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card } from '../../components/Card';

interface ProfileOption {
  id: string;
  title: string;
  icon: string;
  action: () => void;
}

export const ProfileScreen = () => {
  const handleLogout = () => {
    // Handle logout
    console.log('Logging out...');
  };

  const profileOptions: ProfileOption[] = [
    {
      id: '1',
      title: 'My Pets',
      icon: '🐾',
      action: () => console.log('Navigate to My Pets'),
    },
    {
      id: '2',
      title: 'Appointments',
      icon: '📅',
      action: () => console.log('Navigate to Appointments'),
    },
    {
      id: '3',
      title: 'Orders',
      icon: '📦',
      action: () => console.log('Navigate to Orders'),
    },
    {
      id: '4',
      title: 'Settings',
      icon: '⚙️',
      action: () => console.log('Navigate to Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }}
          style={styles.profileImage}
          defaultSource={require('../../assets/images/placeholder.png')}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Options</Text>
        {profileOptions.map((option) => (
          <TouchableOpacity key={option.id} onPress={option.action}>
            <Card style={styles.optionCard}>
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionTitle}>{option.title}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 15,
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
