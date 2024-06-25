import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  FontAwesome,
  MaterialIcons,
  Octicons,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { electionCategory } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Result = () => {
  const navigation = useNavigation();
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

      {/**election category */}
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
          data={electionCategory}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
              navigation.navigate("level", { title: item.title })
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
                {item.title}
              </Text>

              <View
                
                style={{
            
                  paddingHorizontal: 20,
                  
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>see results</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({});
