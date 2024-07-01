import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { server } from '../constants/config';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ElectionStatisticsScreen = () => {
  const [statistics, setStatistics] = useState(null);
  const navigation = useNavigation();

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${server}/election/statistics/`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching election statistics:', error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!statistics) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.header}>Election Statistics</Text>
      </View>
      <View style={styles.statisticsContainer}>
        <Text>Total People: {statistics.total_people}</Text>
        <Text>Total Nominees: {statistics.total_nominees}</Text>
        <Text>Total Votes: {statistics.total_votes}</Text>
        <Text>Total Positions: {statistics.total_positions}</Text>
        <Text style={styles.winnersText}>Winners:</Text>
        {statistics.winners.map((winner, index) => (
          <View key={index} style={styles.winnerContainer}>
            <Text>{winner.position}: {winner.winner}</Text>
            <Text>Votes: {winner.votes}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:15
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statisticsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  winnersText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  winnerContainer: {
    marginVertical: 5,
  },
});

export default ElectionStatisticsScreen;
