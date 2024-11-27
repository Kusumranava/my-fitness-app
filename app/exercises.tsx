import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { fetchExerciseBodyParts } from '../api/exerciseDB';
import { dummyExercises } from "../constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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

  const getExercises = async (bodyPart) => {
    try {
      setLoading(true);
      const data = await fetchExerciseBodyParts(bodyPart);
      setExercise(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9417c5" />
      </View>
    );

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );

  const handleExercisePress = (exercise) => {
    router.push({ pathname: "/exerciseDetails", params: exercise });
  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleExercisePress(item)}>
      <View style={styles.cardContent}>
        <Image style={styles.exerciseImage} source={{ uri: item.gifUrl }} />
        <View>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseTarget}>Target: {item.target}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image source={item.image} style={styles.headerImage} className="rounded-b-[30px]" />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          name="arrow-back-outline"
          size={20}
          color="white"
        />
        <Text style={styles.headerTitle}>{item.name}</Text>
      </View>

      {/* Exercise List */}
      <FlatList
        data={exercise}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f4f6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: wp(100),
    height: hp(45),
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    padding: 10,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  listContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exerciseTarget: {
    fontSize: 14,
    color: '#666',
  },
});
