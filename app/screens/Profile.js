import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, StatusBar } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, Button, Icon } from 'native-base'; // Import Modal and Button from NativeBase
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {
  const [user, setUser] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const retrieveUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } else {
        Alert.alert('Error', 'User data not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    retrieveUserId();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = async () => {
    try {
      navigation.navigate('login'); 
      await AsyncStorage.clear()
     
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        
        {/* Settings button */}
        <TouchableOpacity style={styles.settingsButton} onPress={toggleModal}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <UserAvatar size={120} name={`${user.firstname} ${user.lastname}`} src={user.profile_image} />
        
          <TouchableOpacity style={styles.updateAvatarButton} onPress={()=>navigation.navigate('upload')}>
            <Text style={styles.updateAvatarButtonText}>Upload campaign material</Text>
          </TouchableOpacity>
        
      </View>

      {/* Personal Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.info}>{user.firstname}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.info}>{user.lastname}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
  
      </View>

      {/* Logout Modal */}
      <Modal isOpen={isModalVisible} onClose={toggleModal} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Settings</Modal.Header>
          <Modal.Body>
            <Button
              onPress={handleLogout}
              colorScheme="danger"
              variant="solid"
              size="lg"
              mt={4}
              startIcon={<Icon as={<Ionicons name="log-out-outline" />} size={5} color="#fff" />}
            >
              Logout
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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
    flex: 1,
  },
  settingsButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
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
