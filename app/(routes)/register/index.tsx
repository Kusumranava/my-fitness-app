import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginImage } from '../../../constants';
import auth from '@react-native-firebase/auth';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
 const router=useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Register the user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Update the display name
      await userCredential.user.updateProfile({
        displayName: userName,
      });

      alert('User registered successfully with display name!');
      router.push("/home")
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 ">
      <Image
        source={LoginImage.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[30px]"
      />
      <Text className='text-2xl mb-4 mt-3 ps-9 font-bold'>
        Register to My FitnessApp
      </Text>
      <TextInput
        placeholder="UserName"
        value={userName}
        onChangeText={setUserName}
        style={{ height: hp(7), width: wp(85) }}
        className="border-b border-gray-300 mb-4 p-2 text-base mx-auto flex justify-center items-center"
      
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ height: hp(7), width: wp(85) }}
        className="border-b border-gray-300 mb-4 p-2 text-base mx-auto flex justify-center items-center"
        keyboardType="email-address"
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
              onPress={handleRegister}
              style={{ height: hp(7), width: wp(85) }}
              className="mx-auto bg-[#9417c5] flex items-center justify-center rounded-xl"
            >
              <Text style={{ fontSize: hp(3) }} className="font-bold text-center text-white">
              
                {loading ? "Loading" : "Register"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push({pathname:'/(routes)/login'})} className="mt-4 mx-auto">
        <Text className="text-center text-blue-600 underline">Already Have an account ? login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
