import { Image, Text, View, TouchableOpacity } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import fitness from '../constants/fitness';

interface FitnessItem {
  image: string;
  exercises: { id: string; image: string; name: string; sets: number; }[];
  id: string;
  name: string;
}

const FitnessCards = () => {
  const FitnessData: FitnessItem[] = fitness;
  const navigation = useNavigation();

  return (
    <View style={{marginTop: 80, marginHorizontal: 20, marginBottom: 20}}>
         <View className="mb-5 w-full flex items-center justify-between flex-row">
        <Text className="text-black font-semibold text-lg">Basic Workout Plan You Can Follow</Text>
        <Text className="text-gray-500 font-medium text-sm">View All</Text>
      </View>

      {
        FitnessData.map((item :FitnessItem, id) => (
          <TouchableOpacity onPress={() => navigation.navigate<FitnessItem>("workout", {
            image: item.image, 
            exercises: item.exercises,
            id: item.id
          })} style={{alignItems: 'center', justifyContent: "center", marginTop: 10, marginBottom: 10}} key={id}>
            <Image style={{ width: "100%", height: 120, borderRadius: 12 }} source={{uri: item.image}} />
            <Text style={{position: "absolute", color: "white", fontSize: 16, fontWeight: "bold", left: 20, top: 20}}>{item.name}</Text>
            <MaterialCommunityIcons name="lightning-bolt" size={30} color="#dfbe04" style={{position: "absolute", bottom: 15, left: 15}} />
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default FitnessCards