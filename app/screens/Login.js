import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          navigation.navigate('home'); // Navigate to main screen if user data exists
        } else {
          setLoading(false); // Stop loading and show login screen if no user data
        }
      } catch (error) {
        console.error('Error checking user data in AsyncStorage:', error);
        setLoading(false); // Stop loading and show login screen on error
      }
    };

    checkUserLoggedIn();
  }, [navigation]);

  const handleLogin = () => {
    axios.post(`${server}/login/`, {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response.data);
      const userData = response.data.user;
      AsyncStorage.setItem('userData', JSON.stringify(userData))
        .then(() => {
      
          navigation.navigate('otp'); // Navigate to OTP screen upon successful login
        })
        .catch(error => {
          
        });
    })
    .catch(error => {
      alert(JSON.stringify(error.response.data.error))
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A313" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.subTitleContainer}>
        <FontAwesome6 name="circle-dot" size={12} color="#00A313" />
        <Text style={styles.subTitle}>Daruso Election</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          w={{
            base: "95%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              as={<Octicons name="mail" size={12} color="#00A313" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="email"
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
        <View style={styles.forgotPasswordContainer}>
          <View></View>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <TouchableOpacity onPress={() => navigation.navigate('signup')} style={styles.signupLink}>
          <Text style={styles.signupLinkText}>Don't have an account? Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00A313",
  },
  subTitleContainer: {
    flexDirection: "row",
    marginTop: 210,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  subTitle: {
    color: "#00A313",
    fontSize: 15,
  },
  inputContainer: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgotPasswordButton: {
    marginLeft: 160,
  },
  forgotPasswordText: {
    color: "#00A313",
  },
  loginButton: {
    backgroundColor: "#00A313",
    paddingHorizontal: 120,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupLinkText: {
    color: '#00A313',
    textDecorationLine: 'underline',
  },
});
