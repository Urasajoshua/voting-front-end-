import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../constants/config";
import * as ImagePicker from 'expo-image-picker';
import { Modal, Button, FormControl, Input, NativeBaseProvider } from "native-base";

const PositionsScreen = ({route}) => {
  const [positions, setPositions] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [colleges, setColleges] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [image, setImage] = useState(null);

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


  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${server}/positions/`);
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
        Alert.alert("Error", "Failed to fetch positions. Please try again.");
      }
    };

    const fetchColleges = async () => {
      
      try {
        const response = await axios.get(
          `http://192.168.1.171:8000/positions/positions_by_college/?college=${route.params.position}`
        );
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
        Alert.alert("Error", "Failed to fetch positions. Please try again.");
      }
    };

    fetchPositions();

    
    fetchColleges();
  }, []);

  const handleNominate = (positionId) => {
    setSelectedPositionId(positionId);
    setModalVisible(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitNomination = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        throw new Error("User data not found in AsyncStorage");
      }
      const { id: user_id } = JSON.parse(userData);

      const nomineeData = new FormData();
      nomineeData.append("position", selectedPositionId);
      nomineeData.append("user_id", user_id);
      nomineeData.append("purpose", purpose);
      nomineeData.append("approved", false);
      if (image) {
        nomineeData.append("image", {
          uri: image,
          name: `nominee_${user_id}_${selectedPositionId}.jpg`,
          type: "image/jpeg",
        });
      }

      console.log('nominee data',nomineeData);

      const response = await axios.post(`${server}/nominees/`, nomineeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert(
        "Nomination Submitted",
        "Your nomination has been submitted and is awaiting approval."
      );
      setModalVisible(false);
      setPurpose("");
      setImage(null);
    } catch (error) {
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.detail || "Failed to nominate. Already a nominee."
        );
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response received from server. Please check your network connection."
        );
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  console.log('trtrttr',route.params.position);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, paddingTop: 25 }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            width: "100%",
            marginTop: 26,
          }}
        >
          <Text style={{ color: "#00A313", fontSize: 20, textAlign: "center" }}>
            Election Positions
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
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.positionItem}
                onPress={() => handleNominate(item.id)}
              >
                <Text style={styles.positionText}>{item.name}</Text>
                <Text style={styles.nominateText}>Nominate</Text>
              </TouchableOpacity>
            )}
          />
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
            data={colleges}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.positionItem}
                onPress={() => handleNominate(item.id)}
              >
                <Text style={styles.positionText}>{item.name}</Text>
                <Text style={styles.nominateText}>Nominate</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size={'full'}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Nomination Details</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Purpose</FormControl.Label>
                <Input
                  value={purpose}
                  onChangeText={setPurpose}
                  placeholder="Enter your purpose"
                />
              </FormControl>
              <FormControl mt="3">
                <Button onPress={pickImage}>Pick an Image</Button>
                {image && (
                  <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={styles.image} />
                  </TouchableOpacity>
                )}
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onPress={submitNomination}>Submit</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
};

export default PositionsScreen;

const styles = StyleSheet.create({
  positionItem: {
    backgroundColor: "#00A313",
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionText: {
    color: "white",
    fontSize: 18,
  },
  nominateText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
