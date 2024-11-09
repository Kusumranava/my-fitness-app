import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

interface Workout {
    date: string;
    exercise: string;
    reps: number;
    sets: number;
}

const WorkoutList: React.FC<{ workouts: Workout[] }> = ({ workouts }) => {

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
                <View >
                    <Text >{date}</Text>
                    {groupedWorkouts[date].map((workout, index) => (
                        <View key={index} style={styles.workoutItem}>
                            <Text style={styles.workoutText}>{workout.exercise}</Text>
                            <Text style={styles.workoutText}>Reps: {workout.reps}</Text>
                            <Text style={styles.workoutText}>Sets: {workout.sets}</Text>
                        </View>
                    ))}
                </View>
            )}
        />
    );
    
};

const styles = StyleSheet.create({
    workoutItem: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
    },
    workoutText: {
        fontSize: 16,
    },
});



import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressScreen: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

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

    return <WorkoutList workouts={workouts} />;
};

export default ProgressScreen;