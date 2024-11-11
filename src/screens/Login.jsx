// LoginVerificationScreen.js
import React, { useState } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,TextInput,Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP Input
  const [selectedCountry, setSelectedCountry] = useState('🇮🇳');
  
  const otpInputRefs = Array(4).fill(0).map(() => React.createRef());

  const handlePhoneContinue = () => {
    if (phoneNumber.length === 10) {
      setStep(2);
    }
  };

  const handleOtpChange = (text, index) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Move to next input if current input is filled
      if (text.length === 1 && index < 3) {
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  const isOtpComplete = otp.every(digit => digit.length === 1);

  const handleVerifyOtp = () => {
    if (isOtpComplete) {
      // Handle OTP verification logic here
      navigation.navigate('Home');
    }
  };

  const handleResendOtp = () => {
    // Implement resend OTP logic
    console.log('Resend OTP');
  };

  const handleBackPress = () => {
    if (step === 2) {
      setStep(1);
      setOtp(['', '', '', '']);
    } else {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient
      colors={['rgba(95, 238, 172, 1)', 'rgba(21, 143, 94, 1)']}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBackPress}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={require('../Assets/grocery-image.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          {step === 1 ? 'Get started with App' : 'Verify your details'}
        </Text>
        <Text style={styles.subtitle}>
          Login or Sign up to use the app
        </Text>

        {step === 1 ? (
          // Phone Number Input
          <View style={styles.inputContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCode}>{selectedCountry}</Text>
              <Text style={styles.countryCode}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="00000 00000"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
          </View>
        ) : (
          // OTP Input
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={otpInputRefs[index]}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            ))}
          </View>
        )}

        {step === 2 && (
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive OTP? </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendButton}>Resend</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            ((step === 1 && phoneNumber.length !== 10) || 
             (step === 2 && !isOtpComplete)) && styles.disabledButton
          ]}
          onPress={step === 1 ? handlePhoneContinue : handleVerifyOtp}
          disabled={
            (step === 1 && phoneNumber.length !== 10) || 
            (step === 2 && !isOtpComplete)
          }
        >
          <Text style={styles.continueButtonText}>
            {step === 1 ? 'Continue →' : 'Verify and continue'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By clicking I accept the Terms & conditions.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#E5E5E5',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: 'white',
  },
  resendButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: 'rgba(21, 143, 94, 1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Login;