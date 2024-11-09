import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);

    const calculateBMI = () => {
        const weightValue = parseFloat(weight);
        const heightValue = parseFloat(height);

        if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
            Alert.alert('Invalid input', 'Please enter valid weight and height values.');
            return;
        }

        const heightInMeters = heightValue / 100;
        const bmiValue = weightValue / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(2));
    };

    const getBMICategory = (bmi: number) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
        if (bmi >= 25 && bmi < 29.9) return 'Overweight';
        return 'Obesity';
    };

    const getBMISuggestion = (bmi: number) => {
        if (bmi < 18.5) return 'You should eat more and gain some weight.';
        if (bmi >= 18.5 && bmi < 24.9) return 'You are in a healthy range. Keep it up!';
        if (bmi >= 25 && bmi < 29.9) return 'You should consider losing some weight.';
        return 'You should consult with a healthcare provider for advice.';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BMI Calculator</Text>
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />
            <TouchableOpacity style={styles.button} onPress={calculateBMI}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            {bmi && (
                <>
                    <Text style={styles.result}>Your BMI is: {bmi}</Text>
                    <Text style={styles.result}>Category: {getBMICategory(bmi)}</Text>
                    <Text style={styles.suggestion}>{getBMISuggestion(bmi)}</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#9417c5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    result: {
        marginTop: 20,
        fontSize: 24,
        color: '#333',
    },
    suggestion: {
        marginTop: 10,
        fontSize: 18,
        color: '#666',
    },
});

export default BMICalculator;
