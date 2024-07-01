import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input, Icon, Pressable } from 'native-base';
import axios from 'axios';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '../constants/config';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const handleOtpVerification = async () => {
    try {
      // Get user data from AsyncStorage
      const userData = await AsyncStorage.getItem('userData');
      const { id: user_id } = JSON.parse(userData);

      axios.post(`${server}/verify-otp/`, {
        user_id,
        otp,
      })
      .then(response => {
        console.log(response.data);
        // Reset the navigation stack and navigate to 'home' screen upon successful OTP verification
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'home' }],
          })
        );
      })
      .catch(error => {
        console.error('Error verifying OTP:', error.response.data);
        // Handle error (display message to user, etc.)
      });
    } catch (error) {
      console.error('Error getting user data from AsyncStorage:', error);
      // Handle AsyncStorage error (display message to user, etc.)
    }
  };

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 20,
          fontWeight: 'bold',
          color: '#00A313',
        }}
      >
        OTP Verification
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 210,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Text style={{ color: '#00A313', fontSize: 15 }}>Enter OTP sent to your email</Text>
      </View>

      <View
        style={{
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Input
          w={{
            base: '95%',
            md: '25%',
          }}
          placeholder="OTP"
          onChangeText={(text) => setOtp(text)}
          value={otp}
        />
        <TouchableOpacity onPress={handleOtpVerification} style={{backgroundColor:"#00A313",paddingHorizontal:120,paddingVertical:10,borderRadius:6}}>
          <Text style={{color:'white',fontWeight:'bold'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({});
