import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  FontAwesome,
  MaterialIcons,
  Octicons,
  FontAwesome6,
} from "@expo/vector-icons";
import { Input, Icon, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation()

  const handleLogin = () =>{
    navigation.navigate('home')
  }
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
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Password"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View></View>
          <TouchableOpacity style={{ marginLeft: 160 }}>
            <Text style={{ color: "#00A313" }}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>handleLogin()} style={{backgroundColor:"#00A313",paddingHorizontal:120,paddingVertical:10,borderRadius:6}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
