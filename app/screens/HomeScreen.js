import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { homeScreen } from '../constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const [electionData, setElectionData] = useState(null);
  const navigation = useNavigation();

  const fetchElectionData = async () => {
    try {
      const response = await axios.get('http://192.168.1.171:8000/elections/', {
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
        },
      });
      setElectionData(response.data);
    } catch (error) {
      console.error('Error fetching election data:', error);
    }
  };

  useEffect(() => {
    fetchElectionData();
  }, []);

  const handleItemPress = (item) => {
    if (item.title === 'Election Calendars') {
      navigation.navigate('ElectionDetails', { electionData });
    } else if (item.title === 'Election Positions') {
      navigation.navigate('PositionsScreen');
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 15 }}>
        <FontAwesome6 name="circle-dot" size={12} color="#00A313" />
        <Text style={{ color: "#00A313", fontSize: 20 }}>Daruso Election</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList 
          data={homeScreen} 
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderWidth: 0.4, paddingHorizontal: 10 }}
              onPress={() => handleItemPress(item)}
            >
              <View style={{ gap: 1 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22 }}>{item.title}</Text>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 16 }}>{item.description}</Text>
              </View>
              <View>
                <Ionicons name="chevron-forward-sharp" size={18} color="black" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>Trending News</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
