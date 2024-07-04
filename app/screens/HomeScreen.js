import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { server } from '../constants/config';
import { homeScreen } from '../constants';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [electionData, setElectionData] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]); // Added state for trending news
  const navigation = useNavigation();
  const [user,setUser]= useState('')


  const retrieveUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } else {
        Alert.alert('Error', 'User data not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    retrieveUserId();
  }, []);

  const fetchElectionData = async () => {
    try {
      const response = await axios.get(`${server}/elections/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setElectionData(response.data);
    } catch (error) {
      console.error('Error fetching election data:', error);
    }
  };

  const fetchTrendingNews = async () => {
    try {
      const response = await axios.get(`${server}/materials/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTrendingNews(response.data);
    } catch (error) {
      console.error('Error fetching campaign materials:', error);
    }
  };

  useEffect(() => {
    fetchElectionData();
    fetchTrendingNews();
  }, [trendingNews]);

  const handleItemPress = (item) => {
    if (item.title === 'Election Calendars') {
      navigation.navigate('ElectionDetails', { electionData });
    } else if (item.title === 'Election Positions') {
      navigation.navigate('PositionsScreen',{position:user?.colleage});
    } 
    else if (item.title === 'Election Statistics') {
      navigation.navigate('electionStatistics');
    }
    else if (item.title === 'Election Support') {
      navigation.navigate('Support'); // Navigate to SupportScreen
    } else if (item.title === 'Election Procedures') {
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
      navigation.navigate('procedures', { procedures });
    }
  };

  const renderCampaignMaterial = ({ item }) => (
    <View style={styles.materialContainer}>
      <Text style={styles.nomineeName}>{item.nominee.firstname} {item.nominee.lasttname}</Text>
      <Text style={styles.materialDescription}>{item.description}</Text>
      <Image source={{ uri: item.file }} style={styles.materialImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome6 name="circle-dot" size={12} color="#00A313" />
        <Text style={styles.headerText}>Daruso Election</Text>
      </View>
      <FlatList 
        data={homeScreen} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => handleItemPress(item)}
          >
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward-sharp" size={18} color="black" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
  },
  headerText: {
    color: '#00A313',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'column',
  },
  itemTitle: {
    color: '#343a40',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  itemDescription: {
    color: '#6c757d',
    fontSize: 14,
  },
  trendingNews: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00A313',
  },
  noTrendingNews: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#6c757d',
  },
  materialContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  nomineeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  materialDescription: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 10,
  },
  materialImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default HomeScreen;
