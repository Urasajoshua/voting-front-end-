import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Level = ({ route }) => {
  const { title, level } = route.params;
  const navigation = useNavigation();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`http://192.168.1.171:8000/positions/?level=${level}`);
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, [level]);

  return (
    <View style={{ flex: 1, paddingTop: 25, backgroundColor: 'white' }}>
      <TouchableOpacity style={{position:'absolute',top:50,left:20}} onPress={() => navigation.goBack()}>
        <Ionicons name='chevron-back' size={20} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center", 
          paddingHorizontal: 15,
          width: '100%', 
          marginTop: 26 
        }}
      >
        <Text style={{ color: "#00A313", fontSize: 20, textAlign: 'center' }}>
          {title}
        </Text>
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
          data={positions}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View
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
                style={{ color: "white", fontSize: 18, paddingHorizontal: 10, width: 180 }}
              >
                {item.name}
              </Text>

              <View
                style={{
                  paddingHorizontal: 20
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>{item.contenders}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default Level;
