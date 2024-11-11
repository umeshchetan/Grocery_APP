// OnboardingScreen.js
import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  Image 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Delivery at your doorstep',
    description: 'Brings the grocery store to you, ensuring your favorite items arrive quickly and safely right at your front door for ultimate convenience.',
    image: require('../Assets/cart1.png')
  },
  {
    id: '2',
    title: 'Convenient & Reliable',
    description: 'Provides a seamless shopping experience with on-time delivery and easy reordering, ensuring you can always count on us for your needs.',
    image: require('../Assets/grocerybag.png')
  },
  {
    id: '3',
    title: 'Healthy & Fresh',
    description: 'Guarantees a wide range of farm-fresh produce and nutritious options, helping you make wholesome choices for you and your family every day.',
    image: require('../Assets/basket.png')
  },
  {
    id: '4',
    title: 'Delivery at your doorstep',
    description: 'Brings the grocery store to you, ensuring your favorite items arrive quickly and safely right at your front door for ultimate convenience.',
    image: require('../Assets/cart2.png')
  }
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      flatListRef.current.scrollToIndex({
        index: nextSlideIndex,
        animated: true
      });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace('Login');
    }
  };

  const skip = () => {
    navigation.replace('Login');
  };

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        {/* Progress Dots */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.continueButton]}
            onPress={goToNextSlide}
          >
            <Text style={styles.continueText}>Continue →</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={skip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Slide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['rgba(95, 238, 172, 1)', 'rgba(21, 143, 94, 1)']}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
    borderRadius: 2,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  continueButton: {
    backgroundColor: 'white',
  },
  skipButton: {
    backgroundColor: 'transparent',
  },
  continueText: {
    color: 'rgba(21, 143, 94, 1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
  },
});

export default OnboardingScreen;