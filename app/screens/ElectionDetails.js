import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ElectionDetails = ({ route }) => {
  const { electionData } = route.params;
  const navigation = useNavigation();

  const procedures = [
    {
      title: 'Campaign',
      description: 'This stage involves candidates presenting their platforms and trying to gain the support of voters through various means such as rallies, debates, and advertisements.',
    },
    {
      title: 'Vote',
      description: 'During this stage, eligible voters cast their ballots to choose their preferred candidates. Voting can take place in person at designated polling stations or through mail-in ballots.',
    },
    {
      title: 'Result',
      description: 'After voting ends, the votes are counted and the results are announced. The candidate with the most votes is declared the winner and takes office as per the election rules.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Election Calendar</Text>
      {electionData && electionData.length > 0 ? (
        electionData.map((election, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.electionItem}
            onPress={() => navigation.navigate('ElectionProcedures', { procedures })}
          >
            <Text style={styles.electionText}>🗓️ Election will start on: {new Date(election.start_date).toLocaleDateString()}</Text>
            <Text style={styles.electionText}>⏰ And will end on: {new Date(election.end_date).toLocaleDateString()}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noElectionsText}>No active elections at the moment.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  electionItem: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  electionText: {
    fontSize: 18,
    color: '#495057',
  },
  noElectionsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#adb5bd',
  },
});

export default ElectionDetails;
