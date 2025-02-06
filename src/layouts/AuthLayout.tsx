import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { LoginScreen } from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import theme from 'styles/theme';
import { Button } from 'components/Button';
import { useNavigation } from '@react-navigation/native';

export const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => setIsLogin(!isLogin);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/main-logo1.png')} />
      <View style={{ alignItems: 'center' ,justifyContent:"center", gap:20}}>
        <Button title="LOGIN" onPress={()=>{
          navigation.navigate('LoginScreen');
        }} variant="primary"
        style={{ width: 200}}  />
        <Button title="REGISTER" onPress={()=>{
          navigation.navigate('RegisterScreen');
        }} variant="primary"
        style={{ width: 200}}  />
      </View>
      {/* {isLogin ? (
        <LoginScreen onRegisterPress={toggleAuth} />
      ) : (
        <RegisterScreen onLoginPress={toggleAuth} />
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
