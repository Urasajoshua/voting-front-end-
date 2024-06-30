import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Result = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://192.168.1.171:8000/election_results/'); // Replace with your actual endpoint
        const sortedResults = response.data.sort((a, b) => b.vote_count - a.vote_count);
        setResults(sortedResults);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [results]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A313" />
      </View>
    );
  }

  console.log('results',results);

  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          paddingHorizontal: 15,
        }}
      >
        <FontAwesome6 name="circle-dot" size={12} color="#00A313" />
        <Text style={{ color: "#00A313", fontSize: 20 }}>Daruso Election</Text>
      </View>

      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          justifyContent: "flex-start",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("level", { title: item.position.name })
              }
              style={{
                backgroundColor: "#00A313",
                margin: 10,
                paddingVertical: 25,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  {item.position.name}
                </Text>
                <Text style={{ color: "white", fontSize: 15 }}>
                  {item.user.first_name} {item.user.last_name}
                </Text>
              </View>

              <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ color: "white", fontSize: 15 }}>
                  {item.vote_count} votes
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Result;
