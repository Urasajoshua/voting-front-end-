import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Vote = () => {
  const navigation = useNavigation();

  const levels = [
    { name: 'College Level', level: 'college' },
    { name: 'University Level', level: 'university' }
  ];

  const renderLevelItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('level', { title: item.name, level: item.level })}
      style={styles.levelItem}
    >
      <View style={styles.levelInfo}>
        <Text style={styles.levelName}>{item.name}</Text>
        <Text style={styles.levelDescription}>Tap to view details and vote</Text>
      </View>
      <View style={styles.voteButtonContainer}>
        <Text style={styles.voteButtonText}>Vote</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome6 name="circle-dot" size={24} color="#00A313" style={styles.icon} />
        <Text style={styles.headerText}>Daruso Election</Text>
      </View>

      {/* Levels List */}
      <FlatList
        data={levels}
        keyExtractor={(item) => item.level}
        renderItem={renderLevelItem}
        contentContainerStyle={styles.levelsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A313',
  },
  levelsList: {
    paddingTop: 10,
  },
  levelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  levelDescription: {
    fontSize: 14,
    color: '#495057',
  },
  voteButtonContainer: {
    backgroundColor: '#00A313',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  voteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Vote;
