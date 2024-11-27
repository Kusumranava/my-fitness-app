import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

export default function index() {
  const [initilizing,setInitializing]=useState(true);
  const [user,setUser]=useState(null);
  const router = useRouter();
  const op=(user)=>{
    console.log(user)
     setUser(user);
     if(initilizing)setInitializing(false)
  }
  useEffect(()=>{
const subscriber=auth().onAuthStateChanged(op)
return subscriber;
  },[])

  const handleRediraction=()=>{
    if(user!=null)
      
    {
      router.push({ pathname: '/home' })
    }
    else
    {
     router.push({ pathname: '/login' })
    }
   
  }
  return (
    <>
      <View className="flex flex-1 items-center justify-end">
        <StatusBar style='light' />
        <Image
          className="h-full w-full absolute"
          source={require('../assets/images/welcome3.png')}
        />

        <LinearGradient
          colors={["transparent", "#18181b"]}
          style={{ width: wp(100), height: hp(70) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          className="flex justify-end pb-20 space-y-10"
        >
          <Animated.View entering={FadeInDown.delay(100).springify()} className="flex items-center">
            <Text style={{ fontSize: hp(5.8) }} className="text-white font-bold tracking-wide">LOSE <Text className="text-[#d29ce8] font-extrabold">WEIGHT</Text></Text>
            <Text style={{ fontSize: hp(5.2) }} className="text-white font-semibold tracking-wide">IN 30 DAYS</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <TouchableOpacity
              onPress={() =>handleRediraction()}
              style={{ height: hp(7), width: wp(85) }}
              className="mx-auto bg-[#9417c5] flex items-center justify-center rounded-full"
            >
              <Text style={{ fontSize: hp(3) }} className="font-bold text-center text-white">
                {initilizing ?"Loading" :"Get Started"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>
    </>
  )
}