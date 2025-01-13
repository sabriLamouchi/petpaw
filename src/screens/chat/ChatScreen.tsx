import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface ChatScreenProps {
  recipientId: string;
  recipientName: string;
  recipientImage: string;
  onBack: () => void;
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'user',
    text: 'Hi, I have a question about my pet',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    senderId: 'vet1',
    text: 'Hello! Sure, I\'d be happy to help. What seems to be the concern?',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    senderId: 'user',
    text: 'My dog hasn\'t been eating well lately',
    timestamp: '10:31 AM',
  },
  {
    id: '4',
    senderId: 'vet1',
    text: 'I understand your concern. How long has this been going on? And have you noticed any other changes in behavior?',
    timestamp: '10:32 AM',
  },
];

const MessageBubble: React.FC<{ message: Message; isUser: boolean }> = ({
  message,
  isUser,
}) => (
  <View
    style={[
      styles.messageBubble,
      isUser ? styles.userMessage : styles.recipientMessage,
    ]}
  >
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.messageTime}>{message.timestamp}</Text>
  </View>
);

export const ChatScreen: React.FC<ChatScreenProps> = ({
  recipientName,
  recipientImage,
  onBack,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: message.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: recipientImage }}
          style={styles.recipientImage}
          defaultSource={require('../../assets/images/placeholder.png')}
        />
        <Text style={styles.recipientName}>{recipientName}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble message={item} isUser={item.senderId === 'user'} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  recipientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  messagesList: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  recipientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9ECEF',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
