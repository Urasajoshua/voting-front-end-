import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av'; // Import Video component from expo-av
import { server } from '../constants/config';

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    fetchTrendingNews();
  }, [trendingNews]);

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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>{`${item.nominee.firstname} ${item.nominee.lastname}`}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
        {renderMedia(item.file)}
      </View>
    );
  };

  const renderMedia = (fileUrl) => {
    if (!fileUrl) {
      return null;
    }

    // Check if fileUrl is an image URL (ends with .jpg, .jpeg, .png, etc.)
    if (/\.(jpeg|jpg|png|gif)$/i.test(fileUrl)) {
      return <Image source={{ uri: fileUrl }} style={styles.newsImage} />;
    }

    // Check if fileUrl is a video URL (ends with .mp4, .mov, etc.)
    if (/\.(mp4|mov)$/i.test(fileUrl)) {
      return (
        <Video
          source={{ uri: fileUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={styles.newsVideo}
          useNativeControls // Enable native playback controls
        />
      );
    }

    // If fileUrl is neither an image nor a video URL, return a placeholder or handle as needed
    return <Text>No preview available</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.trendingNews}>Trending News</Text>
      {trendingNews.length === 0 ? (
        <Text style={styles.noTrendingNews}>There is no trending news at this moment.</Text>
      ) : (
        <FlatList
          data={trendingNews}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  trendingNews: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 24,
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
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
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
    resizeMode: 'cover',
  },
  newsVideo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default TrendingNews;
