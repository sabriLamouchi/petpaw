import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from 'styles/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import fonts from 'styles/fonts';
const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface SlideItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

const slides = [
  {
    id: '1',
    title: 'Welcome to our app',
    description: 'Welcome here to use our your Pet to help us take good care of your pet',
    image: require('../../assets/images/main-logo1.png'),
  },
  {
    id: '2',
    title: 'Get Fast Service',
    description: 'Use this app to get all services you need for your lovely pet',
    image: require('../../assets/images/fast-service.png'),
  },
  {
    id: '3',
    title: 'Adoption',
    description: 'Get chance to find many pets here that you can get and take home',
    image: require('../../assets/images/adoption.png'),
  },
  {
    id: '4',
    title: 'Vet Consultation',
    description: 'Visit the nearest vet clinic make sure your pet is healthy and happy',
    image: require('../../assets/images/vet.png'),
  },
];

const Slide: React.FC<{ item: SlideItem }> = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation<NavigationProp>();
  console.log('Navigation Prop:', navigation);
  const ref = useRef<FlatList>(null);

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length -1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: theme.colors.secondary,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentSlideIndex === slides.length - 1 ? (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={[styles.btnText, { color: theme.colors.background }]}>Get Started</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: theme.colors.shadow}]}
                onPress={skip}>
                <Text style={[styles.btnText, { color: theme.colors.primary }]}>SKIP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ styles.nextBtn]}
                onPress={goToNextSlide}>
                  <AntDesign name="arrowright" size={50} color={theme.colors.background} style={{
                    transform: [{ rotate: '-42deg' }],
                  }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{...styles.topView,right:width/3.5}}/>
      <View style={{...styles.topView,left:width/3.5}}/>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    // height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 100,
  },
  image: {
    width: width * 0.5,
    // height: height * 0.5,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSizes.medium,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily: fonts.regular,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 200,
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 3,
    borderRadius: "50%",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    height: 200,
    width:width,
    position:"absolute",
    bottom:0,
    // justifyContent:"center",
    alignItems:"center",
  },
  btn: {
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width:width*0.5,
    top:50
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',

  },
  nextBtn: {
    backgroundColor: theme.colors.secondary,
    width:120,
    height:120,
    justifyContent:'center',
    borderRadius:25,
    transform: [{ rotate: '45deg' }],
    top:20,
    right:-80
  },
  topView:{
    backgroundColor:theme.colors.secondary,
    height:height*0.3,
    width:width,
    position:'absolute',
    top:-50,
    borderRadius:'50%'
  }
});

export default OnboardingScreen;
