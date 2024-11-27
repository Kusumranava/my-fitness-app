import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Workout {
  date: string;
  exercise: string;
  reps: number;
  sets: number;
}

const WorkoutTable: React.FC<{ workouts: Workout[]; onDelete: (workout: Workout) => void }> = ({
  workouts,
  onDelete,
}) => {
  const groupWorkoutsByDate = (workouts: Workout[]) => {
    return workouts.reduce((acc, workout) => {
      (acc[workout.date] = acc[workout.date] || []).push(workout);
      return acc;
    }, {} as Record<string, Workout[]>);
  };

  const groupedWorkouts = groupWorkoutsByDate(workouts);

  return (
    <FlatList
      data={Object.keys(groupedWorkouts)}
      keyExtractor={(item) => item}
      renderItem={({ item: date }) => (
        <View style={styles.tableContainer}>
          <Text style={styles.dateHeader}>{date}</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Exercise</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Reps</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Sets</Text>
              <Text style={[styles.tableCell, styles.tableHeader, { flex: 0.5 }]}>Actions</Text>
            </View>
            {/* Table Rows */}
            {groupedWorkouts[date].map((workout, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{workout.exercise}</Text>
                <Text style={styles.tableCell}>{workout.reps}</Text>
                <Text style={styles.tableCell}>{workout.sets}</Text>
                <TouchableOpacity
                  style={[styles.tableCell, styles.deleteButton, { flex: 0.5 }]}
                  onPress={() => onDelete(workout)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    />
  );
};

const ProgressScreen: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem('workouts');
        if (storedWorkouts) {
          setWorkouts(JSON.parse(storedWorkouts));
        }
      } catch (error) {
        console.error('Failed to load workouts from storage', error);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (workoutToDelete: Workout) => {
    const updatedWorkouts = workouts.filter(
      (workout) =>
        workout.date !== workoutToDelete.date ||
        workout.exercise !== workoutToDelete.exercise ||
        workout.reps !== workoutToDelete.reps ||
        workout.sets !== workoutToDelete.sets
    );

    setWorkouts(updatedWorkouts);

    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error('Failed to delete workout from storage', error);
    }
  };

  if (workouts.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.emptyText}>
          No workouts found! Start logging your workouts to track progress.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
     <View className='mt-10'>
     <WorkoutTable workouts={workouts} onDelete={deleteWorkout} />
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  tableContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    padding: 5,
    backgroundColor: '#f9c2ff',
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
    backgroundColor: '#9417c5',
    padding: 10,
    borderRadius: 20,
  },
});

export default ProgressScreen;
