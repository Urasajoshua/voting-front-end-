import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { homeScreen } from '../constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server } from '../constants/config';

const HomeScreen = () => {
  const [electionData, setElectionData] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]); // Added state for trending news
  const navigation = useNavigation();

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
      navigation.navigate('PositionsScreen');
    } else if (item.title === 'Election Support') {
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
    <View style={{ flex: 1, paddingTop: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 15 }}>
        <FontAwesome6 name="circle-dot" size={12} color="#00A313" />
        <Text style={{ color: "#00A313", fontSize: 20 }}>Daruso Election</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList 
          data={homeScreen} 
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.itemContainer}
              onPress={() => handleItemPress(item)}
            >
              <View style={{ gap: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward-sharp" size={18} color="black" />
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={styles.trendingNews}>Trending News</Text>
      {trendingNews.length === 0 ? (
        <Text style={styles.noTrendingNews}>There is no trending news at this moment.</Text>
      ) : (
        <FlatList 
          data={trendingNews}
          renderItem={renderCampaignMaterial}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderWidth: 0.4,
    paddingHorizontal: 10,
  },
  itemTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
  itemDescription: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  trendingNews: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00A313',
  },
  noTrendingNews: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 18,
    color: '#6c757d',
  },
  materialContainer: {
    padding: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc',
  },
  nomineeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  materialDescription: {
    fontSize: 16,
    color: '#495057',
  },
  materialImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default HomeScreen;
