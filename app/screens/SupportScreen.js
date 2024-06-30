import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockNominees = [
  { id: 1, firstName: 'John', lastName: 'Smith', course: 'Computer Science', year: '3', position: 'Chairperson' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', course: 'Electrical Engineering', year: '2', position: 'General Secretary' },
  { id: 3, firstName: 'Mike', lastName: 'Brown', course: 'Mechanical Engineering', year: '4', position: 'USRC' },
  { id: 4, firstName: 'Emily', lastName: 'Johnson', course: 'Civil Engineering', year: '1', position: 'President' },
  { id: 5, firstName: 'Anna', lastName: 'Williams', course: 'Biomedical Engineering', year: '3', position: 'Vice President' },
];

const SupportScreen = () => {
  const [nominees, setNominees] = useState(mockNominees);
  const navigation = useNavigation();

  const handleSupport = (nomineeId) => {
    // Placeholder function for handling support action
    alert(`Support action for nominee with ID ${nomineeId}`);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Nominees</Text>
        <View style={{ width: 50 }}></View>
      </View>

      {/* Nominees List */}
      <FlatList
        data={nominees}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.nomineeItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nomineeName}>{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={styles.nomineeDetails}>{`${item.course}, Year ${item.year}`}</Text>
              <Text style={styles.nomineePosition}>{item.position}</Text>
            </View>
            <TouchableOpacity
              style={styles.supportButton}
              onPress={() => handleSupport(item.id)}
            >
              <Text style={styles.supportButtonText}>Support</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00A313',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop:20
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nomineeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  nomineeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  nomineeDetails: {
    fontSize: 16,
    color: 'gray',
  },
  nomineePosition: {
    fontSize: 16,
    color: 'blue',
  },
  supportButton: {
    backgroundColor: '#00A313',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
