import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from '../../components/Card';

interface ChatPreview {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientType: 'vet' | 'sitter';
  recipientImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    recipientId: 'vet1',
    recipientName: 'Dr. Sarah Wilson',
    recipientType: 'vet',
    recipientImage: 'https://example.com/vet1.jpg',
    lastMessage: 'I can help you with your pet\'s vaccination schedule',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    recipientId: 'sitter1',
    recipientName: 'Lisa\'s Pet Sitting',
    recipientType: 'sitter',
    recipientImage: 'https://example.com/sitter1.jpg',
    lastMessage: 'Yes, I\'m available next weekend',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
];

interface ChatPreviewCardProps {
  chat: ChatPreview;
  onPress: (chat: ChatPreview) => void;
}

const ChatPreviewCard: React.FC<ChatPreviewCardProps> = ({ chat, onPress }) => (
  <TouchableOpacity onPress={() => onPress(chat)}>
    <Card style={styles.chatCard}>
      <Image
        source={{ uri: chat.recipientImage }}
        style={styles.avatar}
        defaultSource={require('../../assets/images/placeholder.png')}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.recipientName}>{chat.recipientName}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        <View style={styles.chatPreview}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

interface ChatListScreenProps {
  onChatSelect: (recipientId: string, recipientName: string, recipientImage: string) => void;
}

export const ChatListScreen: React.FC<ChatListScreenProps> = ({ onChatSelect }) => {
  const handleChatPress = (chat: ChatPreview) => {
    onChatSelect(chat.recipientId, chat.recipientName, chat.recipientImage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={mockChats}
        renderItem={({ item }) => (
          <ChatPreviewCard chat={item} onPress={handleChatPress} />
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
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
