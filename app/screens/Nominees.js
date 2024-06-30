import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import UserAvatar from 'react-native-user-avatar';
import { Modal, Button } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Nominees = ({ route }) => {
  const { position,id } = route.params;
  const navigation = useNavigation();
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchNominees();
    retrieveUserId();
  }, []);

  const retrieveUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        console.log('User ID:', parsedUserData.id);
        setUserId(parsedUserData.id);
      } else {
        Alert.alert('Error', 'User ID not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchNominees = async () => {
    try {
      const response = await axios.get(`http://192.168.1.171:8000/positions/${position}/nominees/`);
      setNominees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nominees:', error);
      setLoading(false);
      Alert.alert('Error', 'Something went wrong while fetching nominees. Please check your network connection.');
    }
  };

  const handleVotePress = async () => {
    try {
      const data = {
        nominee_id: selectedNominee,  // Ensure this is the nominee ID
        user_id: userId,              // Ensure this is the user ID
        position_id: id               // Ensure this is the position ID
      };
      const response = await axios.post('http://192.168.1.171:8000/votes/', data);
  
      if (response.status === 201) {
        Alert.alert('Success', 'Vote submitted successfully.');
        setShowModal(false);
      } else {
        throw new Error('Failed to vote. Server responded with an error.');
      }
    } catch (error) {
      Alert.alert(`${JSON.stringify(error.response.data.error)}`);
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color="#00A313" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name='chevron-back' size={20} color="#00A313" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>{position} Nominees</Text>
      </View>

      {nominees.length > 0 ? (
        <FlatList
          data={nominees}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.nomineeItem}
              onPress={() => console.log(`Navigate to nominee profile: ${item.id}`)}
            >
              <UserAvatar size={100} name={`${item.first_name} ${item.last_name}`} src="https://dummyimage.com/100x100/000/fff" />
              <View style={styles.nomineeDetails}>
                <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
                <Text style={styles.details}>{item.year ? `Year ${item.year}` : 'Year not specified'}</Text>
              </View>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => {
                  setSelectedNominee(item.id);
                  setShowModal(true);
                }}
              >
                <Text style={styles.voteButtonText}>Vote</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.noNomineesContainer}>
          <Text style={styles.noNomineesText}>No nominees found for {position}.</Text>
        </View>
      )}

      <Modal isOpen={showModal} onClose={handleModalClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to vote for this nominee?</Text>
          <View style={styles.modalButtons}>
            <Button
              style={[styles.modalButton, { backgroundColor: '#00A313' }]}
              onPress={handleVotePress}
            >
              <Text style={styles.modalButtonText}>Vote</Text>
            </Button>
            <Button
              style={[styles.modalButton, { backgroundColor: '#FF6347' }]}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 26,
  },
  headerText: {
    color: '#00A313',
    fontSize: 20,
    textAlign: 'center',
  },
  nomineeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00A313',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  nomineeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  details: {
    color: 'white',
    fontSize: 15,
  },
  voteButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  voteButtonText: {
    color: '#00A313',
    fontSize: 16,
  },
  noNomineesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNomineesText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});

export default Nominees;
