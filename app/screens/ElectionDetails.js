import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

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

  const markedDates = {};
  electionData.forEach(election => {
    markedDates[election.start_date] = { marked: true, startingDay: true, color: '#00A313', textColor: 'white' };
    markedDates[election.end_date] = { marked: true, endingDay: true, color: '#FF0000', textColor: 'white' };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Election Calendar</Text>
      </View>
      <Calendar
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={(day) => {
          const selectedElection = electionData.find(election => 
            election.start_date === day.dateString || election.end_date === day.dateString
          );
          if (selectedElection) {
            navigation.navigate('ElectionProcedures', { procedures });
          }
        }}
      />
      <View style={styles.datesContainer}>
        {electionData.map((election, index) => (
          <View key={index} style={styles.electionDates}>
            <Text style={styles.dateTitle}>Election {index + 1}</Text>
            <Text style={styles.dateText}>Start Date: {new Date(election.start_date).toLocaleDateString()}</Text>
            <Text style={styles.dateText}>End Date: {new Date(election.end_date).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
  },
  datesContainer: {
    marginTop: 20,
  },
  electionDates: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  dateText: {
    fontSize: 16,
    color: '#495057',
  },
});

export default ElectionDetails;
