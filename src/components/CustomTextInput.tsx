import React, { useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View, Text, StyleSheet, KeyboardTypeOptions, Dimensions } from 'react-native';
import theme from 'styles/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  textContentType: TextInputProps['textContentType'];
  isPassword?: boolean; 
  logoName?: string;
}
const { width, height } = Dimensions.get('window');

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  textContentType,
  isPassword = false, 
  logoName,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',width:"90%" }}>
      <View style={styles.input}>
        {
         logoName && <Feather name={logoName as keyof typeof Feather.glyphMap} size={24} color={theme.colors.secondary} />
        }
        <TextInput
          style={{ width:width*0.6 }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={keyboardType}
          textContentType={textContentType}
          {...props}
        />

      </View>
      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility}
        style={{position:"relative",right:40,bottom:5}}>
         <Entypo name={isPasswordVisible ? 'eye-with-line' : 'eye'} size={24} color={theme.colors.secondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 4,
    borderColor: theme.colors.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginTop: 5,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    gap:10,
    width:width*0.9,
  },
});

export default CustomTextInput;
