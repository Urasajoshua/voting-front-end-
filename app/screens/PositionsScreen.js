import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '../constants/config';

const PositionsScreen = () => {
  const [positions, setPositions] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${server}/positions/`);
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
        Alert.alert('Error', 'Failed to fetch positions. Please try again.');
      }
    };

    fetchPositions();

    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
        Alert.alert('Error', 'Failed to fetch user data. Please try again.');
      }
    };

    getUserData();
  }, []);

  const handleNominate = async (positionId) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        throw new Error('User data not found in AsyncStorage');
      }
      const { id: user_id } = JSON.parse(userData);

      const nomineeData = {
        position: positionId, // Correct the field name to match the backend expectation
        user_id,
      };

      const response = await axios.post(
        `${server}/nominees/`,
        nomineeData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Nomination Submitted', 'Your nomination has been submitted and is awaiting approval.');
    } catch (error) {
      if (error.response) {
    
        Alert.alert('Error', error.response.data.detail || 'Failed to nominate. Please try again.');
      } else if (error.request) {
        
        Alert.alert('Error', 'No response received from server. Please check your network connection.');
      } else {
    
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
      <TouchableOpacity style={{ position: 'absolute', top: 50, left: 20 }} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 15,
          width: '100%',
          marginTop: 26
        }}
      >
        <Text style={{ color: "#00A313", fontSize: 20, textAlign: 'center' }}>
          Election Positions
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          justifyContent: "flex-start",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <FlatList
          data={positions}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.positionItem}
              onPress={() => handleNominate(item.id)}
            >
              <Text style={styles.positionText}>{item.name}</Text>
              <Text style={styles.nominateText}>Nominate</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default PositionsScreen;

const styles = StyleSheet.create({
  positionItem: {
    backgroundColor: "#00A313",
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionText: {
    color: "white",
    fontSize: 18,
  },
  nominateText: {
    color: "white",
    fontSize: 16,
  },
});
