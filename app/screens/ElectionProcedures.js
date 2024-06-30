import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ElectionProcedures = ({ route }) => {
  const { procedures } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Election Procedures</Text>
      {procedures && procedures.length > 0 ? (
        procedures.map((procedure, index) => (
          <View key={index} style={styles.procedureItem}>
            <Text style={styles.procedureTitle}>{procedure.title}</Text>
            <Text style={styles.procedureDescription}>{procedure.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noProceduresText}>No procedures available.</Text>
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
    paddingTop:15
  },
  procedureItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  procedureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  procedureDescription: {
    fontSize: 18,
    color: '#495057',
  },
  noProceduresText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#adb5bd',
  },
});

export default ElectionProcedures;
