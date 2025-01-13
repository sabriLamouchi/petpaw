import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { userService, UserProfile } from '../../services/userService';
import Ionicons from '@expo/vector-icons/Ionicons';
interface ServiceCardProps {
  title: string;
  image: any;
  onPress: () => void;
}

const ServiceCard = ({ title, image, onPress }: ServiceCardProps) => (
  <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
    <Image source={image} style={styles.serviceImage} />
    <Text style={styles.serviceTitle}>{title}</Text>
  </TouchableOpacity>
);

interface PetCardProps {
  name: string;
  image: any;
  onPress: () => void;
}

const PetCard = ({ name, image, onPress }: PetCardProps) => (
  <TouchableOpacity style={styles.petCard} onPress={onPress}>
    <Image source={image} style={styles.petImage} />
    <Text style={styles.petName}>{name}</Text>
  </TouchableOpacity>
);

export const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const profile = await userService.getProfile(user.id);
      if (profile) {
        setUserProfile(profile);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={userProfile?.avatar_url ? { uri: userProfile.avatar_url } : require('../../assets/images/placeholder.png')} 
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>{userProfile?.full_name || 'User'}</Text>
              <Text style={styles.userLocation}>{userProfile?.address || 'No address set'}</Text>
            </View>
          </View>
          <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <Text style={styles.sectionTitle}>Service</Text>
        <View style={styles.servicesContainer}>
          <ServiceCard
            title="Pet Sitting"
            image={require('../../assets/images/pet-sitting.png')}
            onPress={() => {}}
          />
          <ServiceCard
            title="Grooming"
            image={require('../../assets/images/grooming.png')}
            onPress={() => {}}
          />
          <ServiceCard
            title="Pet Guide"
            image={require('../../assets/images/pet-guide.png')}
            onPress={() => {}}
          />
        </View>

        {/* Promotion Banner */}
        <View style={styles.promotionBanner}>
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>The Best Care</Text>
            <Text style={styles.promotionSubtitle}>For your furry friend</Text>
            <Text style={styles.promotionDescription}>Grooming service 30% Off Only</Text>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../../assets/images/placeholder.png')} 
            style={styles.promotionImage}
          />
        </View>

        {/* Adoption Section */}
        <View style={styles.adoptionHeader}>
          <Text style={styles.sectionTitle}>Adoption</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See More →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petsContainer}>
          <PetCard
            name="Stella"
            image={require('../../assets/images/placeholder.png')}
            onPress={() => {}}
          />
          <PetCard
            name="Kitty"
            image={require('../../assets/images/placeholder.png')}
            onPress={() => {}}
          />
          <PetCard
            name="Lucky"
            image={require('../../assets/images/placeholder.png')}
            onPress={() => {}}
          />
        </ScrollView>

        {/* Reminder Section */}
        <Text style={styles.sectionTitle}>Reminder</Text>
        <TouchableOpacity style={styles.reminderCard}>
          <Image 
            source={require('../../assets/images/placeholder.png')} 
            style={styles.doctorImage}
          />
          <View style={styles.reminderInfo}>
            <Text style={styles.doctorName}>Dr. Ridha Zaafrane</Text>
            <Text style={styles.appointmentAddress}>15 Rue de la République Genéve</Text>
            <Text style={styles.appointmentTime}>22/10/2023 at 10:00 A.M</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  userLocation: {
    fontSize: 12,
    color: '#666',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  serviceCard: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    width: '30%',
  },
  serviceImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  promotionBanner: {
    backgroundColor: '#FFF5E9',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 24,
  },
  promotionContent: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7B61FF',
    marginBottom: 4,
  },
  promotionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  promotionImage: {
    width: 120,
    height: 120,
  },
  bookButton: {
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  adoptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeMore: {
    fontSize: 14,
    color: '#666',
  },
  petsContainer: {
    marginBottom: 24,
  },
  petCard: {
    marginRight: 16,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  petName: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  reminderInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  appointmentAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 12,
    color: '#666',
  },
});
