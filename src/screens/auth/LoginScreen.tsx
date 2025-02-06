import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { supabase } from '../../services/supabase';
import { Button } from '../../components/Button';
import CustomTextInput from '../../components/CustomTextInput';
import theme from 'styles/theme';
import fonts from 'styles/fonts';
const { width, height } = Dimensions.get('window');
interface LoginScreenProps {
  onRegisterPress: () => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onRegisterPress,
  onLoginSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      onLoginSuccess?.();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
            <View style={{...styles.topView,right:width/3.5}}/>
            <View style={{...styles.topView,left:width/3.5}}/>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={{}}>Email address</Text>
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        logoName='mail'
      />
      <Text style={{}}>Password</Text>
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        isPassword
        logoName='lock'
      />
      
      <Button 
        title={loading ? "Logging in..." : "Login"} 
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      />
      
      <TouchableOpacity onPress={onRegisterPress} style={styles.linkContainer}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:fonts.bold,
    color:theme.colors.background,
    position:'absolute',
    top:100,
    left:width/4,
    right:width/4
  },
  button: {
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#4A90E2',
    fontSize: 16,
  },
  topView:{
    backgroundColor:theme.colors.secondary,
    height:height*0.3,
    width:width,
    position:'absolute',
    top:-20,
    borderRadius:'50%'
  }
});
