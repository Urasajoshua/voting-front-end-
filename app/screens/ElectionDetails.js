import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ElectionDetails = ({ route }) => {
  const { electionData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Election Calendar</Text>
      {electionData && electionData.length > 0 ? (
        electionData.map((election, index) => (
          <View key={index} style={styles.electionItem}>
            <Text style={styles.electionText}>Start Date: {new Date(election.start_date).toLocaleDateString()}</Text>
            <Text style={styles.electionText}>End Date: {new Date(election.end_date).toLocaleDateString()}</Text>
          </View>
        ))
      ) : (
        <Text>No active elections.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  electionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  electionText: {
    fontSize: 18,
  },
});

export default ElectionDetails;
