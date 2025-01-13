import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ServicesScreen } from '../screens/services/ServicesScreen';
import { MarketplaceScreen } from '../screens/marketplace/MarketplaceScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { TabBar } from '../components/TabBar';

type Tab = 'home' | 'services' | 'chat' | 'marketplace' | 'profile';

interface ChatState {
  isInChat: boolean;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string;
}

export const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [chatState, setChatState] = useState<ChatState>({
    isInChat: false,
  });

  const handleTabPress = (tab: string) => {
    setActiveTab(tab as Tab);
  };

  const handleStartChat = (recipientId: string, recipientName: string, recipientImage: string) => {
    setChatState({
      isInChat: true,
      recipientId,
      recipientName,
      recipientImage,
    });
    setActiveTab('chat');
  };

  const handleBackFromChat = () => {
    setChatState({ isInChat: false });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'services':
        return <ServicesScreen onStartChat={handleStartChat} />;
      case 'chat':
        return chatState.isInChat ? (
          <ChatScreen
            recipientId={chatState.recipientId!}
            recipientName={chatState.recipientName!}
            recipientImage={chatState.recipientImage!}
            onBack={handleBackFromChat}
          />
        ) : (
          <ChatListScreen onChatSelect={handleStartChat} />
        );
      case 'marketplace':
        return <MarketplaceScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>
      <TabBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabs={[
          { key: 'home', label: 'Home', icon: '🏠' },
          { key: 'services', label: 'Services', icon: '🐾' },
          { key: 'chat', label: 'Chat', icon: '💬' },
          { key: 'marketplace', label: 'Shop', icon: '🛍️' },
          { key: 'profile', label: 'Profile', icon: '👤' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
