import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ElectionProcedures = ({ route }) => {
  const { procedures } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Election Procedures</Text>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
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
