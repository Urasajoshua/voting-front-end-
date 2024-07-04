import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { server } from "../constants/config";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [college,setCollege] = useState("")

  const handleSignup = () => {
    axios.post(`${server}/signup/`, {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      year: year,
      college:college
    })
    .then(response => {
      Alert.alert('Signup Successful', 'You can now login with your credentials.');
      navigation.navigate('login'); // Navigate to login screen after successful signup
    })
    .catch(error => {
      Alert.alert('Signup Failed', `${JSON.stringify(error.response.data.email)}`);
      
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
        value={lastName}
      />
       <TextInput
        style={styles.input}
        placeholder="colleage"
        onChangeText={text => setCollege(text)}
        value={college}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        onChangeText={text => setYear(text)}
        value={year}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#00A313",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "#00A313",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
