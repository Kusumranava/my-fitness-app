import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export const getUserDetails = () => {
  const user = auth().currentUser;
  return user;
};

export default function ProfileScreen() {
  const [userDetails, setUserDetails] = useState(null);
  const router=useRouter();

  useEffect(() => {
    // Fetch and set user details on component mount
    const userData = getUserDetails();
    setUserDetails(userData);
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      router.push('/') // Adjust 'Home' to your home page route name
    } catch (error) {
      alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={
          userDetails?.photoURL
            ? { uri: userDetails.photoURL }
            : require('../assets/images/avatar.jpeg')
        }
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.userName}>
        {userDetails?.displayName || 'Fit Enthusiast'}
      </Text>

      {/* User Email */}
      <Text style={styles.userEmail}>
        {userDetails?.email || 'No email provided'}
      </Text>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileImage: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(7.5),
    marginBottom: 20,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: hp(2),
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#9417c5',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: hp(2.2),
    fontWeight: 'bold',
  },
});
