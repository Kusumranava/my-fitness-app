import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Workout {
    exercise: string;
    reps: number;
    sets: number;
}

const NoteTaking: React.FC = () => {
    const [exercise, setExercise] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const navigation = useNavigation();

    const addWorkout = async () => {
        const date = new Date().toISOString().split('T')[0];
        const newWorkout = { exercise, reps: parseInt(reps), sets: parseInt(sets), date };
        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        setExercise('');
        setReps('');
        setSets('');
    };

    const loadWorkouts = async () => {
        const storedWorkouts = await AsyncStorage.getItem('workouts');
        if (storedWorkouts) {
            setWorkouts(JSON.parse(storedWorkouts));
        }
    };

    React.useEffect(() => {
        loadWorkouts();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white px-5" edges={["top"]}>
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Workout Tracker</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Exercise Name"
                    value={exercise}
                    onChangeText={setExercise}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Reps"
                    value={reps}
                    onChangeText={setReps}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sets"
                    value={sets}
                    onChangeText={setSets}
                    keyboardType="numeric"
                />
                <Button title="Add Workout" onPress={addWorkout} />
            </ScrollView>
            <View style={styles.bottomButton}>
                <Button title="Check Your Progress" onPress={() => router.push('/progress')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    bottomButton: {
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
      
        padding: 10,
        borderRadius: 25,
    },
});

export default NoteTaking;
