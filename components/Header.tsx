import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export const getUserDetails = () => {
  const user = auth().currentUser;
  return user;
};

export default function Header() {
  const [userDetails, setUserDetails] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router =useRouter();

  useEffect(() => {
    const userData = getUserDetails();
    setUserDetails(userData);
  }, []);


  return (
    <View className="flex flex-row items-center justify-between mb-8 mt-5">
      <View className="space-y-1">
        <Text
          style={{
            fontSize: hp(2),
          }}
          className="font-normal tracking-wider text-slate-500"
        >
          Welcome Back,
        </Text>
        <Text
          style={{
            fontSize: hp(3),
          }}
          className="font-bold tracking-wider text-neutral-800"
        >
          {userDetails?.displayName || 'Fit Enthusiast'}
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={() =>router.push("/profile") }>
          <Image
            source={
              userDetails?.photoURL
                ? { uri: userDetails.photoURL }
                : require('../assets/images/avatar.jpeg')
            }
            style={{ height: hp(6), width: hp(6) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
        
    
      </View>
    </View>
  );
}
