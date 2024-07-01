import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { server } from '../constants/config';

const Level = ({ route }) => {
  const { title, level } = route.params;
  const navigation = useNavigation();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${server}/positions/?level=${level}`);
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, [level]);

  const handlePositionPress = (position) => {
    navigation.navigate('nominees', { position: position.name, id: position.id }); // Passing id here
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name='chevron-back' size={24} color='#00A313' />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Positions List */}
      <FlatList
        data={positions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePositionPress(item)}>
            <View style={styles.positionItem}>
              <Text style={styles.positionName}>{item.name}</Text>
              <View style={styles.contendersContainer}>
                <Text style={styles.contendersText}>{item.contenders}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A313',
  },
  positionItem: {
    backgroundColor: '#00A313',
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  positionName: {
    fontSize: 18,
    color: 'white',
    width: 180, // Adjust width as needed
  },
  contendersContainer: {
    paddingHorizontal: 20,
  },
  contendersText: {
    fontSize: 15,
    color: 'white',
  },
});

export default Level;
