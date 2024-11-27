import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ExerciseDetailsScreen = () => {
  const exercise = useLocalSearchParams();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: exercise.gifUrl }} style={styles.headerImage} />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          name="arrow-back-outline"
          size={20}
          color="white"
        />
      </View>

      {/* Content */}
      <LinearGradient
        colors={['#ffffff', '#f3f4f6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.contentContainer}
      >
        <Text style={styles.title}>{exercise.name}</Text>

        {/* Details Section */}
        <View style={styles.card}>
          <Text style={styles.label}>🎯 Target Muscles:</Text>
          <Text style={styles.value}>{exercise.target}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>💪 Secondary Muscles:</Text>
          <Text style={styles.value}>{exercise.secondaryMuscles}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>🛠 Equipment:</Text>
          <Text style={styles.value}>{exercise.equipment}</Text>
        </View>

        {/* Instructions Section */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.label}>📋 Instructions:</Text>
          {exercise?.instructions &&
            exercise.instructions.split(',').map((instruction, index) => (
              <View key={index} style={styles.instructionWrapper}>
                <Text style={styles.instructionIndex}>{index + 1}.</Text>
                <Text style={styles.instructionText}>{instruction.trim()}</Text>
              </View>
            ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    padding: 8,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9417c5',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  instructionsContainer: {
    marginTop: 20,
  },
  instructionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  instructionIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9417c5',
    marginRight: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
  },
});

export default ExerciseDetailsScreen;
