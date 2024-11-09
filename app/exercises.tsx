import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { fetchExerciseBodyParts } from '../api/exerciseDB';
import { dummyExercises } from "../constants"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ActivityIndicator, ScrollView, StatusBar, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Exercises() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exercise, setExercise] = useState(dummyExercises);
  const item = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (item.name) {
      getExercises(item.name);
    }
  }, [item.name]);

  const getExercises = async (bodyPart: string) => {
    try {
      setLoading(true);
      const data = await fetchExerciseBodyParts(bodyPart);
      setExercise(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#9417c5" />
    </View>
  );

  if (error) return (
    <View className="flex-1 items-center justify-center">
      <Text>Error: {error}</Text>
    </View>
  );
  const handleExercisePress = (exercise) => {
    router.push({ pathname: "/exerciseDetails", params: exercise })

  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 15, margin: 10, backgroundColor: '#f5f5f5', borderRadius: 8 }}
      onPress={() => handleExercisePress(item)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 80, height: 80, marginRight: 10 }} source={{ uri: item.gifUrl }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}

    >
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[30px]"
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 30, left: 20, backgroundColor: "white", borderRadius: 8, padding: 3 }}
        name="arrow-back-outline"
        size={24}
        color="black"
      />
      <FlatList
        data={exercise}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

    </ScrollView>
  )
}