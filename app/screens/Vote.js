import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Vote = () => {
  const navigation = useNavigation();

  const levels = [
    { name: 'College Level', level: 'college' },
    { name: 'University Level', level: 'university' }
  ];

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
          data={levels}
          keyExtractor={(item) => item.level}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("level", { title: item.name, level: item.level })
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
              <Text
                style={{ color: "white", fontSize: 18, paddingHorizontal: 10 }}
              >
                {item.name}
              </Text>

              <TouchableOpacity
                style={{
                  borderColor: "white",
                  paddingHorizontal: 20,
                  borderWidth: 0.5,
                  marginRight: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>vote</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Vote;

const styles = StyleSheet.create({});
