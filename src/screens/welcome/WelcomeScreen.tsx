import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from 'styles/theme';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Onboarding');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Image  source={require('../../assets/images/main-logo-white.png')} width={50} height={50}  />
            <Image style={{...styles.image}} source={require('../../assets/images/app-name-logo.png')} width={50} height={50}  />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.secondary,
        columnGap:100,
    },
    image:{
        marginTop:-40,
    },
});

export default WelcomeScreen;
