import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6, Octicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Icon, Pressable } from "native-base";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../constants/config";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    axios.post(`${server}/login/`, {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response.data);
      const userData = response.data.user;
      // Save user data in AsyncStorage
      AsyncStorage.setItem('userData', JSON.stringify(userData))
        .then(() => {
          console.log('User data saved in AsyncStorage:', userData);
          // Navigate to 'home' screen upon successful login
          navigation.navigate('home');
        })
        .catch(error => {
          console.error('Error saving user data in AsyncStorage:', error);
          // Handle AsyncStorage error (display message to user, etc.)
        });
    })
    .catch(error => {
      console.error('Error logging in:', error.response.data);
      // Handle error (display message to user, etc.)
    });
  };

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 20,
          fontWeight: "bold",
          color: "#00A313",
        }}
      >
        Login
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 210,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FontAwesome6 name="circle-dot" size={12} color="#00A313" />
        <Text style={{ color: "#00A313", fontSize: 15 }}>Daruso Election</Text>
      </View>

      <View
        style={{
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Input
          w={{
            base: "95%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              as={<Octicons name="number" size={12} color="#00A313" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Registration Number"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          w={{
            base: "95%",
            md: "25%",
          }}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View></View>
          <TouchableOpacity style={{ marginLeft: 160 }}>
            <Text style={{ color: "#00A313" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={{backgroundColor:"#00A313",paddingHorizontal:120,paddingVertical:10,borderRadius:6}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
