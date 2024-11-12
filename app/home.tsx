import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components 
import Header from '../components/Header';
import Progress from '../components/progress';
import MealSchedule from '../components/meal-schedule';
import BodyParts from '../components/body-parts';
import HomeScreen from '../components/homeScreen';
import { Text } from '../components/Themed';
import { router } from 'expo-router';

export default function Home() {
 
  return (
    <SafeAreaView className="flex-1 bg-white px-5" edges={["top"]}>
      <StatusBar style='dark' />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section  */}
        <Header />

        {/* Track Progress  */}
        <Progress />

        {/* Meal Schedule  */}
        <MealSchedule />

        {/* Body Parts  */}
        <BodyParts />

        <HomeScreen/>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/noteTaking')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet .create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9417c5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 24,
  },
});