import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { LoginScreen } from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <SafeAreaView style={styles.container}>
      {isLogin ? (
        <LoginScreen onRegisterPress={toggleAuth} />
      ) : (
        <RegisterScreen onLoginPress={toggleAuth} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
