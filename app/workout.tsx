import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { FitnessItems } from '../context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type RouteParams = {
  image: string;
  exercises: { name: string; sets: string; image: string }[];
};

const WorkoutScreen = () => {
  const route = useRoute();
  const navigation=useNavigation();
  const { completed, setCompleted } = useContext(FitnessItems);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", marginTop: 20 }}
      >
        <Image
          style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[30px]"
          source={{ uri: route.params?.image }}
        />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', top: 30, left: 20, backgroundColor: "white", borderRadius: 8, padding: 3 }}
          name="arrow-back-outline"
          size={24}
          color="black"
        />

        {
          route.params.exercises.map((item, index) => (
            <TouchableOpacity style={{ marginVertical: 12, marginHorizontal: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} key={index}>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Image style={{ width: 90, height: 90, }} source={{ uri: item.image }} />

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ marginTop: 4, fontSize: 16, color: "gray" }}>{item.sets}</Text>
                </View>
              </View>

              {
                completed.includes(item?.name) ? (<AntDesign name="checkcircle" size={24} color="#198f51" />) : null
              }
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      <TouchableOpacity onPress={() => {
        navigation.navigate("fit", { exercises: route.params.exercises }) 
        setCompleted([]);
      }} style={{ backgroundColor: "#198f51", padding: 12, marginHorizontal: 15, marginVertical: 20, borderRadius: 50}}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: 20 }}><MaterialCommunityIcons name="whistle" size={24} color="white" /> START</Text>
      </TouchableOpacity>
    </>
  )
}

export default WorkoutScreen