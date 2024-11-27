import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { LoginImage } from '../../../constants';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email.');
      return false;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Please enter your password.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long.'
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'You have logged in successfully!');
      router.push('/home');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1">
          <Image
            source={LoginImage.image}
            style={{ width: wp(100), height: hp(45) }}
            className="rounded-b-[30px]"
          />
          <Text className="text-2xl mb-4 mt-4 ps-9 font-bold text-center">
            Log-In to My FitnessApp
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ height: hp(7), width: wp(85) }}
            className="border-b border-gray-300 mb-4 p-2 text-base mx-auto flex justify-center items-center"
            keyboardType="email-address"
             inputMode='email'
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={{ height: hp(7), width: wp(85) }}
            className="border-b border-gray-300 mb-4 p-2 text-base mx-auto flex justify-center items-center"
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleLogin}
            style={{ height: hp(7), width: wp(85) }}
            className="mx-auto bg-[#9417c5] mt-3 flex items-center justify-center rounded-xl"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-center text-white"
            >
              {loading ? 'Loading...' : 'Log-In'}
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/(routes)/register' })}
            className="mt-4 mx-auto"
          >
            <Text className="text-center text-blue-600 underline">
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
