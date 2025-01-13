export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  created_at?: string;
}

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  breed: string;
  gender: 'male' | 'female';
  description?: string;
  photos?: string[];
  created_at?: string;
}

export interface Veterinarian {
  id: string;
  name: string;
  specialization: string;
  location: string;
  contact_details: string;
  rating: number;
  available_slots?: string[];
}

export interface PetSitter {
  id: string;
  name: string;
  services: string[];
  location: string;
  rate: number;
  rating: number;
  available_slots?: string[];
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image_urls: string[];
  created_at?: string;
}

export interface AdoptionListing {
  id: string;
  pet_name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  description: string;
  photos: string[];
  contact_info: string;
  created_at?: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  service_provider_id: string;
  service_type: 'vet' | 'sitter';
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  created_at?: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shipping_address: string;
  created_at?: string;
}
