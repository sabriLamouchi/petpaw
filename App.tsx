import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainLayout } from './src/layouts/MainLayout';
import { AuthLayout } from './src/layouts/AuthLayout';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import WelcomeScreen from './src/screens/welcome/WelcomeScreen';
import {LoginScreen} from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import theme from 'styles/theme';
if (Platform.OS === 'android') {
  require('react-native-gesture-handler');
}

const Stack = createStackNavigator();

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('hasSeenOnboarding:', hasSeenOnboarding);
  }, [isAuthenticated, hasSeenOnboarding]);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!hasSeenOnboarding ? (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen 
                name="Onboarding" 
                component={OnboardingScreen} 
                listeners={{
                  beforeRemove: () => setHasSeenOnboarding(true),
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthLayout} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainLayout} />
              ) : null}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const AppLoading = () => {
  return (
    <SafeAreaView style={{...styles.root, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={theme.colors.primary} />
    </SafeAreaView>
  );
};
export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppContent />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
