import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CampainMaterial from './CampainMaterial';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {
  const [user,setUser]=useState('')
  const navigation = useNavigation()
  const retrieveUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        
        setUser(parsedUserData);
      } else {
        Alert.alert('Error', 'User ID not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  };

  useEffect(()=>{
    retrieveUserId()
  })
  
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Personal Information</Text>
       
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <UserAvatar size={120} name={`${user.firstname} ${user.lastname}`} src={user.profile_image} />
        {user.nominee && (
          <TouchableOpacity style={styles.updateAvatarButton}>
            <Text style={styles.updateAvatarButtonText}>Update Profile Image</Text>
          </TouchableOpacity>
          
        )}

<TouchableOpacity onPress={()=>navigation.navigate('upload')} style={styles.updateAvatarButton}>
          <Text>upload election materials</Text>
          </TouchableOpacity>
      </View>

      {/* Personal Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.info}>{user.firstname}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.info}>{user.lastname}</Text>


        <Text style={styles.label}>email:</Text>
        <Text style={styles.info}>{user.email}</Text>

        {/* Add other necessary information fields here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  updateAvatarButton: {
    marginTop: 10,
    backgroundColor: '#00A313',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  updateAvatarButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Profile;
