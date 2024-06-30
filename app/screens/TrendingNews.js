import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { server } from '../constants/config';

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    fetchTrendingNews();
  }, []);

  const fetchTrendingNews = async () => {
    try {
      const response = await axios.get(`${server}/materials/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTrendingNews(response.data);
    } catch (error) {
      console.error('Error fetching trending news:', error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
      <Text style={styles.trendingNews}>Trending News</Text>
      {trendingNews.length === 0 ? (
        <Text style={styles.noTrendingNews}>There is no trending news at this moment.</Text>
      ) : (
        <FlatList
          data={trendingNews}
          renderItem={({ item }) => (
            <View style={styles.newsItem}>
              <Text style={styles.newsTitle}>{item.nominee.firstname} {item.nominee.lastname}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
              <Image source={{ uri: item.file }} style={styles.newsImage} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  newsItem: {
    padding: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  newsDescription: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 10,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default TrendingNews;
