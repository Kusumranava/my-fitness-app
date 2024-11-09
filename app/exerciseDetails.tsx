import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ExerciseDetailsScreen = () => {
 
  const exercise = useLocalSearchParams();
  console.log(exercise)
  return (
    <ScrollView>
      
      <Image
        source={{ uri: exercise.gifUrl }}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[30px]"
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{exercise.name}</Text>
        <Text style={{ marginTop: 10 }}>Target Muscles: {exercise.target}</Text>
        <Text style={{ marginTop: 10 }}>Secondary Muscles: {exercise.secondaryMuscles}</Text>
        <Text style={{ marginTop: 10 }}>Equipment: {exercise.equipment}</Text>
        <Text style={{ marginTop: 10 }}>Instructions:</Text>
        <View style={{ marginLeft: 20 }}>
          {exercise && exercise.instructions.split(",").map((instruction, index) => (
            <Text key={index} style={{ marginTop: 5 }}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseDetailsScreen;